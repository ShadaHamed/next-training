"use client"
import { CommentWithUser } from '@/Utils/types'
import {FaEdit, FaTrash} from 'react-icons/fa'
import UpdateCommentModel from './UpdateCommentModel';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DOMAIN } from '@/Utils/constants';

interface CommentItemProps {
    comment: CommentWithUser;
    userId: number | undefined;
}

const CommentItem = ({comment, userId}: CommentItemProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const commentDeleteHandler = async () => {
    try {
        if(confirm("you want delete this comment, are you sure? "))
        await axios.delete(`${DOMAIN}/api/comments/${comment.id}`)
        router.refresh();
        
    } catch (error:any) {
        toast.error(error?.response?.data.message);
        console.log(error)
    }
  }
    return (
    <div className='mb-5  rounded-lg p-3 bg-gray-200 border-2 borded-gray-300'>
        <div className='flex items-center justify-between mb-2'>
            <strong className='text-gray-800 uppercase'>
                {comment.user.username}
            </strong>
            <span className='bg-yellow-700 px-1 rounded-lg text-white'>
                {new Date(comment.createdAt).toDateString()}
            </span>
        </div>
        <p>
            {comment.text}
        </p>
        
        {userId && userId === comment.userId && (
            <div className='flex justify-end items-center'>
                <FaEdit onClick={()=>setOpen(true)} className='text-green-600 text-xl cursor-pointer me-3'/>
                <FaTrash onClick={commentDeleteHandler} className='text-red-600 text-xl cursor-pointer '/>
            </div>
        )}
        {open && <UpdateCommentModel setOpen={setOpen} text={comment.text} commentId={comment.id} />}
    </div>
  )
}

export default CommentItem