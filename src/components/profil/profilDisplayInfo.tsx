import { Container, useMantineTheme } from "@mantine/core";

interface InfoContainerProps {
  label: string;
  value: string;
}
const ProfilDisplayInfo = ({ label, value }: InfoContainerProps) => {
  const theme = useMantineTheme();

  return (
    <div
      className={`h-14 w-fit rounded-xl ${
        theme.colorScheme === "dark" ? "bg-[#5F3DC4]" : "bg-[#7950F2]"
      }  p-[2px] shadow-2xl`}
    >
      <div
        className="flex h-full w-full items-center justify-around gap-2 rounded-xl px-2"
        style={{
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[1],
        }}
      >
        {label}:
        <Container
          style={{
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.violet[9]
                : theme.colors.violet[6],
            color: theme.colorScheme === "dark" ? "white" : "black",
            borderRadius: "12px",
            padding: "5px 10px",
            fontFamily: "Helvetica",
          }}
        >
          {value}
        </Container>
      </div>
    </div>
  );
};

export default ProfilDisplayInfo;
