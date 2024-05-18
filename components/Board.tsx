'use client'
import { useBoardStore } from '@/store/BoardStore'
import { useEffect } from 'react'
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'
import Column from './Column'

const Board = () => {
	const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(state => [state.board, state.getBoard, state.setBoardState, state.updateTodoInDB])

	useEffect(() => {
		// Get Board
		getBoard()
	}, [getBoard])

	const handleOnDragEnd = (result: DropResult) => {
		const { destination, source, draggableId, type } = result

		if (!destination) return

		if (type === 'column') {
			const newColumnOrder = Array.from(board.columns.keys())
			newColumnOrder.splice(source.index, 1)
			newColumnOrder.splice(destination.index, 0, draggableId as TypedColumn)

			const newColumns = new Map<TypedColumn, Column>()
			newColumnOrder.forEach(columnId => {
				const column = board.columns.get(columnId)
				if (column) newColumns.set(columnId, column)
			})

			setBoardState({ ...board, columns: newColumns })
			return
		}

		const startColumnId = source.droppableId as TypedColumn
		const finishColumnId = destination.droppableId as TypedColumn

		const startColumn = board.columns.get(startColumnId)
		const finishColumn = board.columns.get(finishColumnId)

		if (!startColumn || !finishColumn) return

		if (startColumnId === finishColumnId) {
			const newTodos = Array.from(startColumn.todos)
			const [removed] = newTodos.splice(source.index, 1)
			newTodos.splice(destination.index, 0, removed)

			const updatedColumn = { ...startColumn, todos: newTodos }

			const newColumns = new Map(board.columns)
			newColumns.set(startColumnId, updatedColumn)

			setBoardState({ ...board, columns: newColumns })
		} else {
			const startTodos = Array.from(startColumn.todos)
			const finishTodos = Array.from(finishColumn.todos)

			const [removed] = startTodos.splice(source.index, 1)
			finishTodos.splice(destination.index, 0, removed)

			const updatedStartColumn = { ...startColumn, todos: startTodos }
			const updatedFinishColumn = { ...finishColumn, todos: finishTodos }

			const newColumns = new Map(board.columns)
			newColumns.set(startColumnId, updatedStartColumn)
			newColumns.set(finishColumnId, updatedFinishColumn)

			setBoardState({ ...board, columns: newColumns })

			updateTodoInDB(removed, finishColumnId)
		}
	}

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable droppableId='board' type='column'>
				{provided => (
					<div {...provided.droppableProps} ref={provided.innerRef} className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1440px] px-5 mx-auto'>
						{Array.from(board.columns.entries()).map(([id, column], index) => (
							<Column id={id} key={id} todos={column.todos} index={index} />
						))}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default Board
