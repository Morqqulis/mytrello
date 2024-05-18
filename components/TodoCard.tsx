'use client'
import getUrl from '@/lib/getUrl'
import { useBoardStore } from '@/store/BoardStore'
import { XCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from '@hello-pangea/dnd'

type Props = {
	todo: Todo
	index: number
	id: TypedColumn
	innerRef: (element: HTMLDivElement | null) => void
	draggableProps: DraggableProvidedDraggableProps
	dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
}

const TodoCard = ({ todo, index, id, innerRef, draggableProps, dragHandleProps }: Props) => {
	const deleteTask = useBoardStore(state => state.deleteTask)
	const [imageUrl, setImageUrl] = useState<string | null>(null)

	useEffect(() => {
		if (todo.image) {
			const fetchImage = async () => {
				const url = await getUrl(todo.image!)
				if (url) {
					setImageUrl(url.toString())
				}
			}
			fetchImage()
		}
	}, [todo])

	return (
		<div className='bg-white rounded-md space-y-2 drop-shadow-md' {...draggableProps} {...dragHandleProps} ref={innerRef}>
			<div className='flex flex-col'>
				<div className='flex justify-between items-center p-5'>
					<p>{todo.title}</p>
					<button className='text-red-500 hover:text-red-600 duration-300' onClick={() => deleteTask(index, todo, id)} type='button' title='Delete task'>
						<XCircleIcon className='w-8 h-8  ml-5' />
					</button>
				</div>
				{imageUrl && (
					<div className='relative h-full w-full rounded-b-md'>
						<Image className='w-full max-w-full h-auto  rounded-b-md max-h-[250px]' src={imageUrl} loading='lazy' alt='Task image' width={200} height={100} />
					</div>
				)}
			</div>
		</div>
	)
}

export default TodoCard
