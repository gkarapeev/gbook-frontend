interface User {
	id: number;
	username: string;
}

interface Post {
	id: number;
	content: string;
	author: User;
}
