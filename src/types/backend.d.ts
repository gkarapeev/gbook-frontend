type FriendshipStatus = 'pending' | 'accepted' ;

interface User {
	id: number;
	username: string;
	friendshipStatus?: FriendshipStatus;
	sentByUserId?: User['id'];
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
	userLikesIt: boolean;
}

interface LoginResponse {
	expires: number;
	user: User;
}