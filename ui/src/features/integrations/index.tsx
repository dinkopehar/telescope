import { useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { showNotification } from "../../store/headerSlice";

interface Integration {
  name: string;
  icon: string;
  isActive: boolean;
  description: string;
}

const data: Integration[] = [
  {
    name: "Slack",
    icon: "https://cdn-icons-png.flaticon.com/128/1313/1313632.png",
    isActive: false,
    description:
      "Slack is an instant messaging program designed by Slack Technologies and owned by Salesforce.",
  },
  {
    name: "OpenAI",
    icon: "https://cdn-icons-png.flaticon.com/128/17810/17810358.png",
    isActive: true,
    description:
      "OpenAI is a non-profit artificial intelligence (AI) research institute based in San Francisco, California.",
  },
  {
    name: "Gmail",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968534.png",
    isActive: false,
    description: "GMail is free email service offered by Google.",
  },
];

function Integration(): JSX.Element {
  const dispatch = useDispatch();

  const [integrationList, setIntegrationList] = useState<Integration[]>(data);

  const updateIntegrationStatus = (index: number): void => {
    let integration = integrationList[index];
    setIntegrationList(
      integrationList.map((i, k) => {
        if (k === index) return { ...i, isActive: !i.isActive };
        return i;
      }),
    );
    dispatch(
      showNotification({
        message: `${integration.name} ${integration.isActive ? "disabled" : "enabled"}`,
        status: 1,
      }),
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {integrationList.map((i, k) => {
          return (
            <TitleCard key={k} title={i.name} topMargin={"mt-2"}>
              <p className="flex">
                <img
                  alt="icon"
                  src={i.icon}
                  className="w-12 h-12 inline-block mr-4"
                />
                {i.description}
              </p>
              <div className="mt-6 text-right">
                <input
                  type="checkbox"
                  className="toggle toggle-success toggle-lg"
                  checked={i.isActive}
                  onChange={() => updateIntegrationStatus(k)}
                />
              </div>
            </TitleCard>
          );
        })}
      </div>
    </>
  );
}

export default Integration;
