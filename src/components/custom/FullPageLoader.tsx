import LogoIcon from "@/assets/images/logo-icon.png";

export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <img src={LogoIcon} alt="logo" className="w-40 animate-bounce" />
    </div>
  )
}
