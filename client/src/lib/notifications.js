import axios from "axios";
import { toast } from "sonner";

export const notifyViaEmail = async ({ to, subject, body }) => {
  try {
    await axios.post("/api/email/send", { to, subject, body });
    toast.success("Email sent!");
  } catch (error) {
    console.error("Error sending email:", error);
    toast.error("Something went wrong while sending email");
  }
};

// Function to handle the email notifications
export const handleEmailNotifications = (customer, owner) => {
  // Email to the Proprietor about the customer
  notifyViaEmail({
    to: owner.email, //   proprietor's email
    subject: "Customer Contact Details",
    body: `
      <p>Dear Proprietor,</p>
      <p>A customer has shown interest in your property. Here are their contact details:</p>
      <p>Name: ${customer?.fname} ${customer?.lname}</p>
      <p>Email: ${customer?.email}</p>
      <p>Phone: ${customer?.phone}</p>
      <p>Regards,</p>
      <p>Roomrent Team</p>
    `,
  });

  // Email to the customer about the Owner details
  notifyViaEmail({
    to: owner?.email,
    subject: "Owner Contact details",
    body: `
      <p>Hi ${owner?.name},</p>
      <p>Here is the owner details that you were looking for,</p>
      <p>Name: ${owner?.fname} ${owner?.lname}</p>
      <p>Email: ${owner?.email}</p>
      <p>Phone: ${owner?.phone}</p>
      <p>Regards,</p>
      <p>Roomrent Team</p>
    `,
  });
};
