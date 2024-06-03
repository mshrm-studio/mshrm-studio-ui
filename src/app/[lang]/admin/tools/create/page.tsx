import { Locale } from '@/utils/enums/Locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import ToolForm from '@/components/Admin/Tools/Form'
import Card from '@/components/Admin/Card'
import Breadcrumbs from '@/components/Admin/Breadcrumbs'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dictionary = await getDictionary(lang)

    return (
        <DictionaryContextProvider dictionary={dictionary}>
            <div id="admin-create-tool">
                <div className="mb-6 px-6">
                    <Breadcrumbs
                        items={[
                            {
                                title: dictionary.admin.breadcrumbs.list,
                                href: '/admin/tools',
                            },
                            {
                                title: dictionary.admin.breadcrumbs.create,
                                href: '#',
                            },
                        ]}
                    />
                </div>

                <Card
                    title={dictionary.admin.tool.form.title}
                    description={dictionary.admin.tool.form.description}
                >
                    <ToolForm />
                </Card>
            </div>
        </DictionaryContextProvider>
    )
}
