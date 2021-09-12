interface users {
    id: string,
    username: string,
    password: string,
    fullname: string,
    gender: number,
    email: string,
    working_at: string,
    location: string,
    about: string,
    posts: [
        {
            id: string, // id of post
        }
    ],
    comments: [
        {
            id: string // id of comment
        }
    ]
    
    access_token: string,
}

interface admin{
    id: string,
    username: string,
    password: string,
    access_token: string,
}

interface posts {
    id: string,
    title: string,
    content: string,
    share_url: string,
    author_id: string, // id of user
    create_at: number,
    view: number,
    reactions: [
        {
            like: number,
            dislike: number,
            love: number
        }
    ],
    category: [
        {
            id: string // id of category
        }
    ],
    comments: [
        {
            id: string // id of comments
        }
    ]
    tags: string[] // list tags
}

interface comments {
    id: string,
    user_id: string,
    post_id: string,
    reactions: [
        {
            like: number,
            dislike: number,
            love: number
        }
    ],
    content: string
}

interface category {
    id: string,
    value: string
}

