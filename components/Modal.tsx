'use client'

import { useBoardStore } from '@/store/BoardStore'
import { UseModalStore } from '@/store/ModalStore'
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { PhotoIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { Fragment, useRef } from 'react'
import MyRadioGroup from './MyRadioGroup'

function Modal() {
	const imagePickerRef = useRef<HTMLInputElement>(null)
	const [image, setImage, addTask, newTaskInput, setNewTaskInput, newTaskType] = useBoardStore(state => [state.image, state.setImage, state.addTask, state.newTaskInput, state.setNewTaskInput, state.newTaskType])
	const [isOpen, closeModal] = UseModalStore(state => [state.isOpen, state.closeModal])

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		console.log(file)
		if (file && file.type.startsWith('image/')) {
			setImage(file)
		} else {
			setImage(null)
		}
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!newTaskInput) return

		addTask(newTaskInput, newTaskType, image)

		// setImage(null)
		closeModal()
	}

	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog className='relative z-50' as='form' onClose={closeModal} onSubmit={handleSubmit}>
					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
								<DialogPanel className='max-w-md w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
									<DialogTitle as='h3' className='text-lg font-medium leading-6 text-gray-900 pb-2'>
										Add Task
									</DialogTitle>
									<div className='mt-2'>
										<input
											type='text'
											value={newTaskInput}
											onChange={e => setNewTaskInput(e.target.value)}
											placeholder='Enter a task...'
											className='w-full rounded-md border-gray-300 p-5 outline-none border shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
										/>
									</div>

									<MyRadioGroup />

									<div className='grid mt-2'>
										<button
											className='w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-gray-100'
											type='button'
											onClick={() => imagePickerRef.current?.click()}>
											<PhotoIcon className='h-6 w-6 mr-2 inline-block' />
											Upload Image
										</button>
										{image && (
											<Image
												className='w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed'
												src={URL.createObjectURL(image)}
												alt='Uploaded image'
												width={200}
												height={200}
												onClick={() => {
													setImage(null)
												}}
											/>
										)}
										<input type='file' ref={imagePickerRef} hidden onChange={handleImageChange} />
									</div>
									<div className='mt-4'>
										<button
											className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed'
											type='submit'
											disabled={!newTaskInput}>
											Add Task
										</button>
									</div>
								</DialogPanel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

export default Modal
