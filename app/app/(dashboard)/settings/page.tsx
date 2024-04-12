import { ReactNode } from "react";
import Form from "@/components/form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { editUser } from "@/lib/actions";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          账户设置
        </h1>
        <Form
          title="昵称"
          description="你的昵称"
          helpText="最大不超过 32 个英文字符"
          inputAttrs={{
            name: "name",
            type: "text",
            defaultValue: session.user.name!,
            placeholder: "Li Hua",
            maxLength: 32,
          }}
          handleSubmit={editUser}
        />
        <Form
          title="电子邮件"
          description="你将要绑定的电子邮件。"
          helpText="请输入真实有效的邮件地址。"
          inputAttrs={{
            name: "email",
            type: "email",
            defaultValue: session.user.email!,
            placeholder: "example@vectornote.cn",
          }}
          handleSubmit={editUser}
        />
      </div>
    </div>
  );
}
