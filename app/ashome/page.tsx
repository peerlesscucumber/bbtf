"use client";

const Home = () => {
  return (
    <div className="flex flex-col bg-blue-300 h-screen justify-center items-center p-2">
      <p className="text-3xl">haha</p>
      <button
        className="btn"
        onClick={() =>
          (
            document.getElementById("my_modal_2") as HTMLDialogElement
          ).showModal()
        }
      >
        open modal
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <div></div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Home;
