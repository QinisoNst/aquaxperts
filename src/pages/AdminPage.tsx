import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuthContext } from '../context/AuthContext';

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuthContext();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = await getDocs(collection(db, 'users'));
        setUsers(usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, { role: newRole });
      // Update local state to reflect the change immediately
      setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div>
      <h1>Admin - Manage User Roles</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <select 
                  value={user.role} 
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  disabled={user.id === currentUser?.uid}
                >
                  <option value="community member">Community Member</option>
                  <option value="site worker">Site Worker</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
