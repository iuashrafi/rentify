import { useState } from "react";
import axios from "axios";
import UserDetails from "../../../components/UserDetails";
import { toast } from "sonner";

const ContactOwner = ({ user, property }) => {
  const [ownerDetails, setOwnerDetails] = useState(null);
  const displayModal = () => {
    if (user) {
      document.getElementById("contact_owner").showModal();
    } else {
      toast.error("Login to contact owner!");
    }
  };
  const closeModal = () => {
    document.getElementById("contact_owner").close();
  };
  const showContact = () => {
    if (!property) {
      return;
    }

    axios
      .get(`/api/auth/${property.user_id}`)
      .then((response) => {
        setOwnerDetails(response.data);

        console.log("user=", user, "owner details=", response.data);

        // TODO : send email notifications
      })
      .catch((error) => {
        setOwnerDetails(null);
        toast.error("Something went wrong");
      });
  };
  return (
    <div>
      <h1 className="text-gray-700 text-lg font-semibold">Owner Details</h1>

      {!ownerDetails ? (
        <>
          <button
            className="mt-4 btn btn-neutral rounded-full w-full"
            onClick={displayModal}
          >
            Get owner contact
          </button>
          <dialog id="contact_owner" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Do you want to get Owner's contact?
              </h3>
              <p className="py-4">Owner will be notified about it.</p>

              <div className="float-end space-x-4">
                <button className="btn btn-secondary" onClick={showContact}>
                  Yes
                </button>
                <button className="btn" onClick={closeModal}>
                  No
                </button>
              </div>
            </div>

            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </>
      ) : (
        <>
          <UserDetails user={ownerDetails} />
        </>
      )}
    </div>
  );
};

export default ContactOwner;
