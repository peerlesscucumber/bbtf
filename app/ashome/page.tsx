"use client";

import { useState } from "react";
import ExpenseModal from "./_components/ExpenseModal";

interface SectionData {
  id: number;
  title: string;
  amount: string;
  tags: string;
  date: string;
}

const Home = () => {
  const [expenses, setExpenses] = useState<SectionData[]>([]);

  const updateExpenses = (expArr: SectionData[]) => {
    const updated = expenses.concat(expArr);
    setExpenses(updated);
  };

  const sectionsByDate = expenses.reduce((acc, section) => {
    const date = section.date || "No date";
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(section);
    return acc;
  }, {});

  return (
    <div className="flex flex-col bg-blue-300 h-screen justify-start p-2">
      <div className="flex w-full justify-end items-end">
        <button
          className="btn font-itim"
          onClick={() =>
            (
              document.getElementById("my_modal_2") as HTMLDialogElement
            ).showModal()
          }
        >
          Add expense
        </button>
      </div>

      <dialog id="my_modal_2" className="modal">
        <ExpenseModal updateExpenses={updateExpenses} />
      </dialog>

      <div className="mt-4">
        {Object.entries(sectionsByDate).map(([date, sections]) => (
          <div key={date} className="mb-4">
            <h2 className="font-itim">Date: {date}</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-purple-400 text-black">
                    <th className="font-itim">Title</th>
                    <th className="font-itim">Amount</th>
                    <th className="font-itim">Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {sections.map((section: SectionData) => (
                    <tr key={section.id} className="bg-pink-300 text-black">
                      <td className="font-itim">{section.title}</td>
                      <td className="font-itim">{section.amount}</td>
                      <td className="font-itim">{section.tags}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
