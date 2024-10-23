import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CollectionModal = ({ singlcollectionData, setShowModal, refetch }) => {
  const [collectionDate, setCollectionDate] = useState("");
  const [moneyReceipt, setMoneyReceipt] = useState("");
  const [collectionPurpose, setCollectionPosename] = useState("");
  const [payType, setPayType] = useState("");
  const [receiveBy, setReceiveBy] = useState("");
  const [receiveFrom, setReceiveFrom] = useState("");
  const [collectionAmount, setCollectionAmount] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");

  useEffect(() => {
    if (singlcollectionData) {
      setCollectionDate(singlcollectionData?.date?.slice(0, 10));
      setMoneyReceipt(singlcollectionData.moneyReceipt);
      setPayType(singlcollectionData.payType);
      setCollectionPosename(singlcollectionData.purpose);
      setReceiveBy(singlcollectionData.receiveBy);
      setReceiveFrom(singlcollectionData.receiveFrom);
      setCollectionAmount(singlcollectionData.amount);
      setCollectionDescription(singlcollectionData.discription);
    }
  }, [singlcollectionData]);

  const { data: payGetwayName = [] } = useQuery({
    queryKey: ["payGetwayName"],
    queryFn: async () => {
      const res = await fetch(
        `https://demo-usc-crm-software.vercel.app/pay-getway`
      );
      const data = await res.json();
      return data;
    },
  });

  const { data: allPurposeName = [] } = useQuery({
    queryKey: ["allPurposeName"],
    queryFn: async () => {
      const res = await fetch(
        `https://demo-usc-crm-software.vercel.app/collection-head`
      );
      const data = await res.json();

      return data;
    },
  });

  const updateCollection = () => {
    const collectionData = {
      date: collectionDate,
      moneyReceipt,
      purpose: collectionPurpose,
      payType,
      amount: collectionAmount,
      receiveBy,
      receiveFrom,
      discription: collectionDescription,
    };

    fetch(
      `https://demo-usc-crm-software.vercel.app/update-collection/${singlcollectionData._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(collectionData),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        toast.success(`Collection update sucessfully successfully`);
        setShowModal(false);
        refetch();
      });
  };

  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-[1200px] p-0 py-6">
          <div className="mt-2 w-12/12 mx-auto">
            <fieldset className="border border-solid border-gray-500 p-3 mx-10">
              <legend className="text-2xl">Add Collection</legend>

              <div>
                <div className="my-3 mx-2">
                  <form onSubmit={updateCollection}>
                    <div>
                      <div className="flex flex-row gap-2">
                        <div className="form-control mx-2">
                          <label className="label">
                            <span className="label-text">Date</span>
                          </label>
                          <input
                            name="date"
                            type="date"
                            className="input input-sm w-full input-bordered"
                            defaultValue={collectionDate}
                            onChange={(e) => setCollectionDate(e.target.value)}
                          />
                        </div>

                        <div className="form-control w-10/12 ">
                          <label className="label">
                            <span className="label-text">Money Receipt</span>
                          </label>
                          <input
                            type="text"
                            name="moneyReceipt"
                            placeholder="Money Receipt Here..."
                            className="input input-sm input-bordered w-full"
                            value={moneyReceipt}
                            onChange={(e) => setMoneyReceipt(e.target.value)}
                          />
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Purpose Name</span>
                          </label>
                          <select
                            name="purpose"
                            className="select select-bordered select-sm w-full"
                            onChange={(e) =>
                              setCollectionPosename(e.target.value)
                            }
                          >
                            <option disabled selected>
                              {collectionPurpose}
                            </option>
                            {allPurposeName?.users?.map((user) => (
                              <option key={user._id} value={user.purpose}>
                                {user.purpose}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Payment Type</span>
                          </label>
                          <select
                            name="payType"
                            className="select select-bordered select-sm w-full"
                            onChange={(e) => setPayType(e.target.value)}
                          >
                            <option disabled selected>
                              {payType}
                            </option>
                            {payGetwayName?.users?.map((user) => (
                              <option key={user._id} value={user.name}>
                                {user.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Amount</span>
                          </label>
                          <input
                            type="text"
                            name="amount"
                            placeholder="Enter Amount"
                            className="input input-sm input-bordered w-full"
                            value={collectionAmount}
                            onChange={(e) =>
                              setCollectionAmount(e.target.value)
                            }
                          />
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Receive By</span>
                          </label>
                          <input
                            type="text"
                            name="receiveBy"
                            placeholder="Enter Receive By Name"
                            className="input input-sm input-bordered w-full"
                            value={receiveBy}
                            onChange={(e) => setReceiveBy(e.target.value)}
                          />
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Receive From</span>
                          </label>
                          <input
                            type="text"
                            name="receiveFrom"
                            placeholder="Enter Receive From Name"
                            className="input input-sm input-bordered w-full"
                            value={receiveFrom}
                            onChange={(e) => setReceiveFrom(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex flex-row gap-2">
                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Discription</span>
                          </label>
                          <textarea
                            name="discription"
                            type="text"
                            placeholder="Discription Here....."
                            className="textarea textarea-bordered textarea-lg w-full"
                            value={collectionDescription}
                            onChange={(e) =>
                              setCollectionDescription(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className="modal-action"
                      onClick={() => updateCollection()}
                    >
                      <label
                        htmlFor="my_modal_6"
                        className="btn btn-accent w-full text-white mt-3"
                      >
                        <span>Update Collection</span>
                      </label>
                    </div>
                    <div
                      onClick={() => setShowModal(false)}
                      className="modal-action absolute -top-2 right-2  "
                    >
                      <label
                        htmlFor="my_modal_6"
                        className="btn btn-sm text-xl ring-0 border-0 rounded-full  bg-red-500"
                      >
                        X
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionModal;
