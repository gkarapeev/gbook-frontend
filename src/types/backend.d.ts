interface User {
	id: number;
	username: string;
}

interface Comment {
	id: number;
	postId: number;
	author: User;
	content: string;
	createdAt: number;
}

interface Post {
	id: number;
	content: string;
	author: User;
	host: User;
	createdAt: number;
	comments: Comment[] | null;
	imagePresent: boolean; 
}

interface LoginResponse {
	expires: number;
	user: User;
}