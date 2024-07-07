'use client'

import { useEffect } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'
import useTool from '@/utils/hooks/useTool'
import ConditionalFeedback from '@/components/Admin/ConditionalFeedback'
import ToolForm from '@/components/Admin/Tools/Form'

export default function AdminToolsDetails({ guid }: { guid: string }) {
    const dict = useDictionary()

    const { error, fetching, fetchTool, tool } = useTool()

    useEffect(() => fetchTool(guid), [guid])

    return (
        <ConditionalFeedback fetching={fetching} error={error}>
            {tool && <ToolForm tool={tool} />}
        </ConditionalFeedback>
    )
}
