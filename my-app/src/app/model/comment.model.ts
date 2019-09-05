export class CommentModel{
    id: number;
    body: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    info_user: {
        id: number;
        name: string;
        lastname: string;
        email: string;
        email_verified_at: null;
        image: string;
        created_at: string;
        updated_at: string;
        image_url: string
    }
}