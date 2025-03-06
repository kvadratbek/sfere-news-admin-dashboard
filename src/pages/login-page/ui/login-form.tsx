import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const REDIRECT_URL = import.meta.env.VITE_PRO_ID_REDIRECT_URL;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from interfering
    console.log("Redirecting to:", REDIRECT_URL); // Debug
    window.location.href = REDIRECT_URL;
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome!</CardTitle>
          <CardDescription>Login to Sfere Pro Admin Dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full cursor-pointer"
                >
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50ZM19.6999 45.49C23.9849 46.2737 28.4105 41.5391 30.4881 34.6027C27.1067 35.2326 23.7748 35.3126 20.666 35.0152C21.0846 36.0393 21.5694 37.0559 22.1251 38.0587C22.3013 38.3527 22.4023 38.6994 22.4023 39.0712C22.4023 40.1318 21.5736 40.9916 20.5517 40.9916C19.7972 40.9916 19.148 40.5222 18.8599 39.85C17.8959 38.0522 17.1388 36.2223 16.5613 34.3877C10.5144 33.1098 5.81163 30.5053 4.07976 28.1906C5.35259 36.6065 11.5827 43.3963 19.6999 45.49ZM28.1902 45.9203C36.6172 44.6459 43.4138 38.4014 45.498 30.2688C46.2018 26.0147 41.4933 21.6388 34.6137 19.573C35.2459 23.002 35.3135 26.379 34.9964 29.5229C36.0033 29.1091 37.0027 28.6311 37.9888 28.0846C38.2829 27.9084 38.6296 27.8075 39.0014 27.8075C40.062 27.8075 40.9218 28.6362 40.9218 29.6581C40.9218 30.4126 40.4523 31.0618 39.7802 31.3499C37.991 32.3093 36.17 33.0637 34.3443 33.6402C33.0516 39.59 30.4792 44.2077 28.1902 45.9203ZM31.3553 30.7414C27.2684 31.8126 23.1752 31.9317 19.458 31.3855C18.3703 27.2119 18.2747 23.0329 18.8655 19.2557C22.9579 18.2185 27.0495 18.1305 30.7566 18.7038C31.8325 22.8442 31.9327 26.9893 31.3553 30.7414ZM29.5467 15.0624C26.4468 14.7471 23.1193 14.8055 19.7384 15.4106C21.847 8.42586 26.3378 3.69059 30.6566 4.60894L30.6406 4.60091C38.6173 6.80167 44.7052 13.5557 45.9325 21.8913C44.238 19.5992 39.6189 17.0165 33.6592 15.7171C33.0803 13.8708 32.3197 12.0291 31.3496 10.2198C31.0615 9.54767 30.4123 9.07821 29.6578 9.07821C28.6359 9.07821 27.8072 9.93802 27.8072 10.9986C27.8072 11.3704 27.9082 11.7171 28.0844 12.0112C28.6415 13.0165 29.1274 14.0356 29.5467 15.0624ZM15.6056 30.5499C8.55546 28.4989 3.71776 24.0272 4.51022 19.6992C6.63567 11.4597 13.6 5.16474 22.192 4.02547C19.872 5.62223 17.216 10.2848 15.8843 16.3423C13.9797 16.9276 12.0789 17.7054 10.2127 18.7061C9.54058 18.9941 9.07112 19.6433 9.07112 20.3979C9.07112 21.4197 9.93093 22.2484 10.9915 22.2484C11.3633 22.2484 11.71 22.1475 12.0041 21.9713C13.0644 21.3836 14.1402 20.8753 15.224 20.4407C14.8929 23.6309 14.9571 27.064 15.6056 30.5499Z"
                      fill="#5FE0D8"
                    />
                  </svg>
                  Login with PRO ID
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
