interface Board {
	columns: Map<TypedColumn, Column>
	columnOrder?: TypedColumn[]
}

type TypedColumn = 'todo' | 'inprogress' | 'fix' | 'done'

interface Column {
	id: TypedColumn
	todos: Todo[]
}

interface Todo {
	$id: string
	$createdAt: string
	title: string
	status: TypedColumn
	image?: Image
}

interface Image {
	bucketId: string
	fileId: string
}
