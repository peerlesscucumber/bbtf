import {
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from "react";
import Datepicker from "tailwind-datepicker-react";

interface State {
  sections: SectionData[];
}

interface Action {
  type: "SAVE_SECTIONS";
  payload?: SectionData[];
}

const initialState: State = {
  sections: [{ id: 1, title: "", amount: "", tags: "" }],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SAVE_SECTIONS":
      return { ...state, sections: action.payload || state.sections };
    default:
      return state;
  }
};

interface SectionData {
  id: number;
  title: string;
  amount: string;
  tags: string;
}

const dateOptions = {
  title: "Select date",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-gray-700 dark:bg-gray-800",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "",
    input: "",
    inputIcon: "",
    selected: "",
  },
  // icons: {
  //   // () => ReactElement | JSX.Element
  //   prev: () => <span>Previous</span>,
  //   next: () => <span>Next</span>,
  // },
  datepickerClassNames: "top-12",
  defaultDate: new Date(),
  language: "en",
  disabledDates: [],
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
};

const ExpenseSection: React.FC<{
  section: SectionData;
  sectionLength: number;
  errors: string[];
  onInputChange: (field: "title" | "amount" | "tags", value: string) => void;
  onRemoveSection: () => void;
}> = ({ section, sectionLength, onInputChange, onRemoveSection, errors }) => {
  return (
    <div className="mt-5">
      <div className="flex justify-between align-center font-itim">
        <div>Expense {section.id}</div>
        {(section.id > 1 || sectionLength > 1) && (
          <button
            className="btn-sm btn-outline btn-error"
            onClick={onRemoveSection}
          >
            Remove section
          </button>
        )}
      </div>

      <div className="flex">
        <label className="form-control w-full mr-3">
          <div className="label">
            <span className="label-text font-itim">Title</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className={`input input-bordered w-full font-itim ${
              errors.includes("Title is required") ? "input-error" : ""
            }`}
            value={section.title}
            onChange={(e) => onInputChange("title", e.target.value)}
          />
          {errors.includes("Title is required") && (
            <span className="text-error font-itim">Title is required</span>
          )}
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text font-itim">Amount</span>
          </div>
          <input
            type="number"
            placeholder="Type here"
            className={`input input-bordered font-itim w-full ${
              errors.includes("Amount is required") ? "input-error" : ""
            }`}
            value={section.amount}
            onChange={(e) => onInputChange("amount", e.target.value)}
          />
          {errors.includes("Amount is required") && (
            <span className="text-error font-itim">Amount is required</span>
          )}
        </label>
      </div>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text font-itim">Tags</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full font-itim"
          value={section.tags}
          onChange={(e) => onInputChange("tags", e.target.value)}
        />
      </label>
    </div>
  );
};

const ExpenseModal: React.FC<{
  updateExpenses: (expArr: any) => void;
}> = ({ updateExpenses }) => {
  const [showDate, setShowDate] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [errors, setErrors] = useState({});
  const [sections, setSections] = useState<SectionData[]>([
    { id: 1, title: "", amount: "", tags: "" },
  ]);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setShowDate(false);
  }, []);

  const handleDateChange = (selectedDate: Date) => {
    setSelectedDate(selectedDate);
  };

  const addSection = () => {
    const newSection: SectionData = {
      id: sections.length + 1,
      title: "",
      amount: "",
      tags: "",
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (id: number) => {
    const updatedSections = sections.filter((section) => section.id !== id);
    updatedSections.forEach((section, index) => {
      section.id = index + 1;
    });
    setSections(updatedSections);
  };

  const handleInputChange = (
    id: number,
    field: "title" | "amount" | "tags",
    value: string
  ) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const validateSections = (sections: SectionData[]) => {
    const errors: { [key: string]: string[] } = {};
    let hasError = false;

    sections.forEach((section) => {
      const sectionErrors: string[] = [];

      if (!section.title.trim()) {
        sectionErrors.push("Title is required");
        hasError = true;
      }

      if (!section.amount.trim()) {
        sectionErrors.push("Amount is required");
        hasError = true;
      }

      if (sectionErrors.length > 0) {
        errors[section.id] = sectionErrors;
        hasError = true;
      }
    });

    setErrors(errors);

    return !hasError;
  };

  const saveExpenses = () => {
    const validationPass = validateSections(sections);
    if (!!validationPass) {
      const currentDate = selectedDate.toLocaleDateString();
      const sectionsWithDate = sections.map((section) => ({
        ...section,
        date: currentDate,
      }));

      setSections([{ id: 1, title: "", amount: "", tags: "" }]);
      updateExpenses(sectionsWithDate);
        //dispatch({ type: "SAVE_SECTIONS", payload: sectionsWithDate });
        (document.getElementById("my_modal_2") as HTMLDialogElement).close();
    }
  };

  return (
    <div className="modal-box max-w-3xl">
      <div>
        <div className="mb-2 font-itim">Add expenses for:</div>
        <Datepicker
          options={dateOptions}
          onChange={handleDateChange}
          show={showDate}
          setShow={() => setShowDate(!showDate)}
        />

        {sections.map((section) => (
          <ExpenseSection
            key={section.id}
            errors={errors[section.id] || []}
            sectionLength={sections.length}
            section={section}
            onInputChange={(field, value) =>
              handleInputChange(section.id, field, value)
            }
            onRemoveSection={() => removeSection(section.id)}
          />
        ))}

        <div className="flex justify-center">
          <button
            className="btn btn-primary my-8 font-itim"
            onClick={addSection}
          >
            Add another expense
          </button>
        </div>

        <div className="flex flex-row justify-end align-center">
          <button
            className="btn btn-secondary mr-2 font-itim"
            onClick={saveExpenses}
          >
            Save
          </button>

          <form method="dialog">
            <button className="btn modal-action mt-0 font-itim">Close</button>
          </form>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </div>
  );
};

export default ExpenseModal;
