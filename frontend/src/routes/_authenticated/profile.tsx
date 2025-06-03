import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { userQueryOptions } from "@/lib/api"
import { getInitials } from "@/lib/utils"
import { MailIcon, PhoneIcon, LocationIcon, LinkIcon } from "@/components/Icons/Icons"

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile
})

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions)

  if (error)
    return <div aria-live="polite">An error has occurred: {error.message}</div>
  if (isPending) return <div aria-live="polite">Loading...</div>
  if (!data) return <div aria-live="polite">No user data found</div>

  const fullName = `${data.user.given_name ?? ""} ${data.user.family_name ?? ""}`

  return (
    <div
      data-slot="card"
      className="relative flex flex-col gap-6 py-6 border bg-card text-card-foreground rounded-xl"
    >
      <div data-slot="card-content" className="px-6">
        <span
          data-slot="badge"
          className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-[color,box-shadow] border-transparent bg-primary text-primary-foreground absolute start-4 top-4"
        >
          Pro
        </span>
        <div className="space-y-12">
          <div className="flex flex-col items-center space-y-4">
            <span
              data-slot="avatar"
              className="relative flex overflow-hidden rounded-full shrink-0 size-20"
            >
              {data.user.picture ? (
                <img
                  className="aspect-square size-full"
                  alt={data.user.email || "User avatar"}
                  src={data.user.picture}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="flex items-center justify-center text-xl font-bold text-gray-700 bg-gray-200 aspect-square size-full">
                  {getInitials(fullName)}
                </span>
              )}
            </span>
            <div className="text-center">
              <h5 className="text-xl font-semibold">{fullName}</h5>
              <div className="text-sm text-muted-foreground">
                Project Manager
              </div>
            </div>
          </div>

          <div className="bg-muted grid grid-cols-3 divide-x rounded-md border text-center *:py-3">
            <Stat title="184" label="Post" />
            <Stat title="32" label="Projects" />
            <Stat title="4.5K" label="Members" />
          </div>

          <div className="flex flex-col gap-y-4">
            <InfoRow icon={<MailIcon />} text={data.user.email} />
            <InfoRow icon={<PhoneIcon />} text="(+1-876) 8654 239 581" />
            <InfoRow icon={<LocationIcon />} text="New York" />
            <InfoRow
              icon={<LinkIcon />}
              text={
                <a
                  href="https://shadcnuikit.com"
                  className="hover:text-primary hover:underline"
                  target="_blank"
                >
                  https://shadcnuikit.com
                </a>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ title, label }: { title: string; label: string }) {
  return (
    <div>
      <h5 className="text-lg font-semibold">{title}</h5>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

function InfoRow({
  icon,
  text
}: {
  icon: React.ReactNode
  text: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      {text}
    </div>
  )
}
