import axios from 'axios';
import { useEffect, useState } from 'react';

type Blog = {
    id: string;
    title: string;
    content?: string;
    published: boolean;
    createdAt: string; 
    author: {
        name?: string;
    };
};


type UseBlogsOptions = {
    filter?: string;
    sortBy?: 'title' | 'date'; 
    page?: number;
    pageSize?: number;
};

export const useBlogs = (options: UseBlogsOptions = {}) => {
    const { filter = '', sortBy = 'title', page = 1, pageSize = 10 } = options;
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get<Blog[]>(
                    "https://backend.saxenaishaan03.workers.dev/api/v1/blog/bulk",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                        params: {
                            filter,
                            sortBy,
                            page,
                            pageSize
                        }
                    }
                );
                setBlogs(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch blogs');
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [filter, sortBy, page, pageSize]); 

    return {
        loading,
        blogs,
        error
    };
};
