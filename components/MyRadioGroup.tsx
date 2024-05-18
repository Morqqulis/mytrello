'use client'

import { useBoardStore } from '@/store/BoardStore'
import { Description, Field, Label, Radio, RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const types = [
	{
		id: 'todo',
		name: 'Todo',
		description: 'A new task to be completed',
		color: 'bg-red-500',
	},
	{
		id: 'inprogress',
		name: 'In Progress',
		description: 'A task that is in progress',
		color: 'bg-blue-500',
	},
	{
		id: 'fix',
		name: 'Fix',
		description: 'A task that needs to be fixed',
		color: 'bg-orange-500',
	},
	{
		id: 'done',
		name: 'Done',
		description: 'A completed task',
		color: 'bg-green-500',
	},
]

const MyRadioGroup = () => {
	const [setNewTaskType, newTaskType] = useBoardStore(state => [state.setNewTaskType, state.newTaskType])
	return (
		<div className='w-full py-5'>
			<div className='mx-auto w-full max-w-md'>
				<RadioGroup value={newTaskType} onChange={e => setNewTaskType(e)}>
					{types.map(type => (
						<Field className='space-y-2' key={type.id}>
							<Radio
								value={type.id}
								className={({ disabled, checked }) =>
									`${disabled ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300' : ''}
                                 ${checked ? `${type.color} bg-opacity-75 text-white` : 'bg-white'} cursor-pointer rounded-lg px-5 py-4 relative flex shadow-md focus:outline-none`
								}>
								{({ checked }) => (
									<>
										<div className='flex w-full items-center justify-between'>
											<div className='flex items-center'>
												<div className='text-sm'>
													<Label as='p' className={`font-medium ${checked ? 'text-white' : 'text-gray-900'}`}>
														{type.name}
													</Label>
													<Description as='span' className={`inline ${checked ? 'text-white' : 'text-gray-500'}`}>
														<span>{type.description}</span>
													</Description>
												</div>
											</div>
											{checked && (
												<div className='shrink-0 text-white'>
													<CheckCircleIcon className='h-6 w-6' />
												</div>
											)}
										</div>
									</>
								)}
							</Radio>
						</Field>
					))}
				</RadioGroup>
			</div>
		</div>
	)
}

export default MyRadioGroup
