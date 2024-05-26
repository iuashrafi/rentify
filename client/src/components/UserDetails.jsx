const UserDetails = ({ user }) => {
  return (
    <table className="table mt-4">
      <tbody>
        {/* row 1 */}
        <tr>
          <th>First name</th>
          <td>{user?.fname}</td>
        </tr>
        {/* row 2 */}
        <tr>
          <th>Last name</th>
          <td>{user?.lname}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{user?.email}</td>
        </tr>
        <tr>
          <th>Phone</th>
          <td>{user?.phone}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserDetails;
