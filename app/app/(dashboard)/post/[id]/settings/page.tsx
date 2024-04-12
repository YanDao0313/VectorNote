import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Form from "@/components/form";
import { updatePostMetadata } from "@/lib/actions";
import DeletePostForm from "@/components/form/delete-post-form";

export default async function PostSettings({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.post.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });
  if (!data || data.userId !== session.user.id) {
    notFound();
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          文章设置
        </h1>
        <Form
          title="页面路径"
          description="这是你文章的路径信息即 URL，只能包含小写字母、数字和西文半角连字符。"
          helpText="请输入一个独一无二的路径。"
          inputAttrs={{
            name: "slug",
            type: "text",
            defaultValue: data?.slug!,
            placeholder: "slug",
          }}
          handleSubmit={updatePostMetadata}
        />

        <Form
          title="封面图"
          description="你文章的封面图，支持如下格式：.png, .jpg, .jpeg"
          helpText="文件最大不超过 50MB，建议尺寸 1200x630"
          inputAttrs={{
            name: "image",
            type: "file",
            defaultValue: data?.image!,
          }}
          handleSubmit={updatePostMetadata}
        />

        <DeletePostForm postName={data?.title!} />
      </div>
    </div>
  );
}
