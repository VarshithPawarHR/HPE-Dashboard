import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatusCardProps {
  title: string
  status: string
  statusColor: string
  description: string | ReactNode
  chart?: ReactNode
  action?: ReactNode
  className?: string
}

export function StatusCard({ title, status, statusColor, description, chart, action, className }: StatusCardProps) {
  return (
    <Card className={cn("border-slate-800 bg-[#131926]", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h3 className={cn("text-2xl font-bold", statusColor)}>{status}</h3>
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">{description}</p>
            {chart}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
