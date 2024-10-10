import AddArticleForm from "./AddArticleForm";
import BackButton from "@/components/BackButton";

const AdminPage = () => {

  return (
    <>
    <div className="px-5 pt-4 lg:px-20 font-semibold">
    <BackButton />
    </div>
    <div className="fix-height flex flex-col items-center justify-center px-5 lg:px-20">
      <div className="shadow p-4 bg-purple-200 rounded w-full">
          <h2 className="text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
            Add New Article
          </h2>
          <AddArticleForm />
      </div>
    </div>
    </>
  )
}

export default AdminPage;