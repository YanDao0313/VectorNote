import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateSite } from "@/lib/actions";

export default async function SiteSettingsAppearance({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <Form
        title="预览图"
        description="你站点的预览图，支持如下格式：.png, .jpg, .jpeg"
        helpText="文件最大不超过 50MB，建议尺寸 1200x630"
        inputAttrs={{
          name: "image",
          type: "file",
          defaultValue: data?.image!,
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="Logo"
        description="你站点的 Logo，即站点图标，支持如下格式：.png, .jpg, .jpeg"
        helpText="文件最大不超过 50MB，建议尺寸 400x400"
        inputAttrs={{
          name: "logo",
          type: "file",
          defaultValue: data?.logo!,
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="字体"
        description="你站点上各种标题的字体。"
        helpText="请选择一个字体"
        inputAttrs={{
          name: "font",
          type: "select",
          defaultValue: data?.font!,
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="404 页面提示"
        description="出现 404 错误时，会显示在页面上的信息"
        helpText="最多不超过 240 个字符"
        inputAttrs={{
          name: "message404",
          type: "text",
          defaultValue: data?.message404!,
          placeholder: "Nice try, but this page doesn't exist.",
          maxLength: 240,
        }}
        handleSubmit={updateSite}
      />
    </div>
  );
}
