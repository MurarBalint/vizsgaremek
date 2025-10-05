import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,

  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useQuery } from '@tanstack/react-query'
import {user} from "../index" ;

export const Route = createFileRoute('/users/$userId/')({
  component: RouteComponent,
})

const getuser = ({ID}:{ID: string}) =>{
  return axios.get<user>(`http://localhost:2069/api/user/${ID}`)
} 

function RouteComponent() {
    const navigate = useNavigate();
    const param = Route.useParams();
    const {data: user, isLoading} = useQuery({
      queryKey: ["user", param.userId],
      queryFn: () => getuser({ID: param.userId})
    })
    if(isLoading){
      return <p>Töltés!!!</p>
    }
    return (
    <Card>
      <CardHeader>
        <CardTitle>Felhasználoim</CardTitle>
        <CardDescription>felhasználok</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant={"outline"} onClick={() => navigate({to: "/users"})}>Vissza a felhasznalokhoz</Button>
        <Table>
            <TableCaption>users</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead>ID</TableHead>
              <TableHead>Felhasználó név</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Activ</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>created_at</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow key={user?.data.ID}>
                  <TableCell>{user?.data.ID}</TableCell>
                <TableCell>{user?.data.username}</TableCell>
                <TableCell>{user?.data.email}</TableCell>
                <TableCell>{user?.data.password}</TableCell>
                <TableCell>{user?.data.is_active}</TableCell>
                <TableCell>{user?.data.role}</TableCell>
                <TableCell>{user?.data.created_at}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
      </CardContent>
    </Card>
    )
}

