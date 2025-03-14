"use client"

import type React from "react"

import { LayoutDashboard, Ticket, Gift, Settings, LogOut, Menu, Bell, Search } from "lucide-react"

import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import  {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Skeleton } from "./ui/skeleton"
// import { Input } from "./ui/input"
import { Input } from "./ui/input"
import { AvailableCoupons } from "./available-coupons"
import { ClaimedCoupons } from "./claimed-coupons"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
// import { cn } from "@/lib/utils"
import { cn } from "../lib/utils"
// import { useToast } from "@/hooks/use-toast"
import { useToast } from "../hooks/use-toast"
// import { Avatar } from "./ui/avatar"

interface CouponDashboardProps {
  coupons: string[]
  claimedCoupons: string[]
  claimCoupon: (coupon: string) => Promise<void>
  isLoading: boolean
}

export function CouponDashboard({ coupons, claimedCoupons, claimCoupon, isLoading }: CouponDashboardProps) {
  // const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const { toast } = useToast()

  const handleClaimCoupon = async (coupon: string) => {
    if (claimedCoupons.includes(coupon)) {
      toast({
        title: "Already Claimed!",
        description: `You've already claimed ${coupon}.`,
        variant: "destructive",
      });
      return;
    }
  
    await claimCoupon(coupon);
    toast({ title: "Coupon Claimed", description: `You've successfully claimed ${coupon}.` });
  };
  

  const availableCoupons = coupons.filter((c) => !claimedCoupons.includes(c))

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Ticket className="h-6 w-6 text-primary" />
            <span>CouponHub</span>
          </h1>
        </div>
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
                  item.label === "Dashboard" && "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white",
                )}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </div>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="ghost" className="w-full justify-start gap-2 text-gray-600 dark:text-gray-400">
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        {/* <div className="flex items-center justify-between p-4"> */}
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild className="md:hidden mr-2">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Ticket className="h-6 w-6 text-primary" />
                    <span>CouponHub</span>
                  </h1>
                </div>
                <nav className="flex-1 p-4">
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <Button
                        key={item.label}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
                          item.label === "Dashboard" && "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white",
                        )}
                      >
                        {item.icon}
                        {item.label}
                      </Button>
                    ))}
                  </div>
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="ghost" className="w-full justify-start gap-2 text-gray-600 dark:text-gray-400">
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            {/* <h1 className="text-xl font-semibold text-gray-900 dark:text-white md:hidden">CouponHub</h1> */}
          </div>
          
        {/* </div> */}
      </header>

      {/* Dashboard Content */}
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
        
          <div className="flex flex-col md:flex-row items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Coupon Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400">Manage and claim your exclusive coupons</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="gap-2">
                <Gift className="h-4 w-4" />
                Redeem Gift Card
              </Button>
            </div>
          </div>
          <div className="flex items-center pb-5 gap-4">
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input type="search" placeholder="Search coupons..." className="w-[200px] lg:w-[300px] pl-8" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <DashboardCard
              title="Available Coupons"
              value={availableCoupons.length.toString()}
              description="Coupons ready to claim"
              icon={<Ticket className="h-5 w-5 text-blue-500" />}
              isLoading={isLoading}
            />
            <DashboardCard
              title="Claimed Coupons"
              value={claimedCoupons.length.toString()}
              description="Coupons you've claimed"
              icon={<Gift className="h-5 w-5 text-green-500" />}
              isLoading={isLoading}
            />
            <DashboardCard
              title="Total Savings"
              value="$125.00"
              description="Estimated value of coupons"
              icon={<Badge className="h-5 w-5 text-purple-500" />}
              isLoading={isLoading}
            />
          </div>

          {/* Coupon Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Coupons</CardTitle>
                <CardDescription>Claim these coupons before they expire</CardDescription>
              </CardHeader>
              <CardContent>
                <AvailableCoupons coupons={availableCoupons} onClaimCoupon={handleClaimCoupon} isLoading={isLoading} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Claimed Coupons</CardTitle>
                <CardDescription>Coupons you ve already claimed</CardDescription>
              </CardHeader>
              <CardContent>
                <ClaimedCoupons coupons={claimedCoupons} isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

interface DashboardCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  isLoading: boolean
}

function DashboardCard({ title, value, description, icon, isLoading }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {isLoading ? <Skeleton className="h-8 w-24 mb-1" /> : <div className="text-2xl font-bold">{value}</div>}
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </CardContent>
    </Card>
  )
}

const navItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: "My Coupons",
    icon: <Ticket className="h-5 w-5" />,
  },
  {
    label: "Rewards",
    icon: <Gift className="h-5 w-5" />,
  },
  {
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

