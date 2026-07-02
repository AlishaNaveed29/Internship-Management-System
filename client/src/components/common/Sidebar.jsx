import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const menu = [
  {
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    title: "Internships",
    path: "/internships",
  },
  {
    title: "Applications",
    path: "/applications",
  },
];

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
      }}
    >
      <List>

        {menu.map((item) => (

          <ListItem
            button
            component={Link}
            to={item.path}
            key={item.title}
          >

            <ListItemText
              primary={item.title}
            />

          </ListItem>

        ))}

      </List>
    </Drawer>
  );
}

export default Sidebar;