import { useId } from "react"
import { MailIcon } from "lucide-react"

import { Input } from "@/components/ui/input"

export default function EmailInput({...field}) {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input id={id} className="py-6 px-4 rounded-full bg-[#fff] border-primary/20 placeholder:text-gray-400 peer pe-9" placeholder="Email" type="email" {...field}/>
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-5 peer-disabled:opacity-50">
          <MailIcon size={16} aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
