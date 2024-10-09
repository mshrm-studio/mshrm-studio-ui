'use client'

import { useEffect } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'
import { Separator } from '@/components/Admin/shadcnui/separator'
import DataDisplayItem from '@/components/Admin/DataDisplayItem'
import useTool from '@/utils/hooks/useTool'
import ConditionalFeedback from '@/components/Admin/ConditionalFeedback'

export default function AdminToolsDetails({ guid }: { guid: string }) {
    const dict = useDictionary()

    const { error, fetching, fetchTool, tool } = useTool()

    useEffect(() => fetchTool(guid), [guid])

    return (
        <ConditionalFeedback fetching={fetching} error={error}>
            {tool && (
                <dl>
                    <DataDisplayItem label="GUID" copy={tool.guidId}>
                        {tool.guidId}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.name}>
                        {tool.name}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.logo}>
                        <img src={tool.darkLogoUrl} alt={tool.name} />
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.logo}>
                        <img src={tool.lightLogoUrl} alt={tool.name} />
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.description}>
                        {tool.description || '-'}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem
                        label={dict.attribute.link}
                        copy={tool.link || undefined}
                        link={tool.link || undefined}
                    >
                        {tool.link || '-'}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.rank}>
                        {typeof tool.rank === 'number' ? tool.rank : '-'}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.type}>
                        {dict.enum['ToolType'][tool.toolType]}
                    </DataDisplayItem>
                </dl>
            )}
        </ConditionalFeedback>
    )
}
