import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Logo from '../../assets/42logo.png';
import { useNavigate } from 'react-router-dom'
import { atom, useAtom } from 'jotai';

export const userAtom = atom('');

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [userId, setUserId] = useAtom(userAtom);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = () => {
    navigate('/chatroom')
  }

  useEffect(() => {
    console.log('userid: ', userId);
  }, [userId])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex items-center justify-center p-6">
          <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center">
            <img src={Logo} />
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Intra.id</Label>
                <Input id="email" type="email" placeholder="m@example.com" value={userId} onChange={(e) => setUserId(e.target.value)} required />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    required 
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div> */}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" onClick={handleLogin}>Login</Button>
          <div className="text-center text-sm text-muted-foreground">
            {/* <a href="#" className="hover:underline">Forgot password?</a> */}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}