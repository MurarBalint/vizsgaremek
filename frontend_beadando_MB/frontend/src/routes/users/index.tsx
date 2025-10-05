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

import {CreatUserForm} from '@/routes/users/-components/create-users'; // componenst



export const Route = createFileRoute('/users/')({
  component: RouteComponent,
})

export type user = {
  ID: number,
  email: string,
  password: string,
  username: string,
  is_active: number,
  role: string,
  created_at: string,
}


 


const getusers = () =>{
  return axios.get<user[]>("http://localhost:2069/api/users")
} 


function RouteComponent() {
  const navigate = useNavigate();
  const {data: users, isLoading} = useQuery({
    queryKey: ["users"],
    queryFn: () => getusers()
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
    <CreatUserForm></CreatUserForm>
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
              <TableHead>Megtekintes</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            {users?.data.map((user)=>
              <TableRow key={user.ID}>
                <TableCell>{user.ID}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.is_active}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.created_at}</TableCell>
                <TableCell><Button variant={"outline"} onClick={() => navigate({to: "/users/$userId", params: {userId: ""+user.ID}})}>Megtekintes</Button></TableCell>
              </TableRow>
            )}
          </TableBody>
      </Table>
    </CardContent>
  </Card>
  )
}


