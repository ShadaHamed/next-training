import CommentItem from '@/components/comments/CommentItem';
import { SingleUser } from '@/utils/types';
import { verifyTokenForPage } from '@/utils/verifyToken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from "@/utils/db";
import Link from 'next/link';
import styles from '@/components/header/header.module.css';
import AdminDashboardLayout from '@/app/admin/layout';
import AdminPage from '@/app/admin/page';


interface ProfilePageProps {
  params: { id: string }
}
const ProfilePage = async ({ params }: ProfilePageProps) => {
  const token = cookies().get("jwtToken")?.value;
  if (!token) redirect("/");

  const payload = verifyTokenForPage(token);
  const id = payload?.id;

  const user = await prisma?.user.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      comments: {
        include: {
          user: true, // Include user details for each comment
        },
      },
    },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <div className='fix-height flex flex-col gap-4 pt-5'>

      <div className="flex items-center justify-center px-5 lg:px-20">
        <div className="shadow p-4 bg-purple-400 rounded w-full">
            {user.isAdmin ? 
            <div className='flex justify-between'>
              <h2 className="text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
              Admin Profile
              </h2>
              <Link className="bg-gray-200 text-gray-700 font-semibold rounded p-2 " href="/admin">Admin Dashboard</Link>
            </div> 
            
            : <h2 className="text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
                {user.username}  profile
              </h2>}
          
          <p className='text-gray-700 mb-3'>Email: {user.email}</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 lg:px-20">
        <div className="shadow p-4 bg-purple-400 rounded w-full">
          <h2 className='text-xl lg:text-2xl text-gray-700 font-semibold mb-6">'>Your comments: </h2>
          {user.comments.map(comment => (
            <>
              <CommentItem key={comment.id} comment={comment} userId={user.id} />
            </>
          ))}
        </div>
      </div>

    </div>
  )
}

export default ProfilePage