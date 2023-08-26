import { Box, Text } from "@chakra-ui/react";

const Agenda = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const hours = Array.from({ length: 12 }, (_, i) => i + 8);

  const formatHour = (hour) => {
    return hour < 12 ? `${hour}am` : `${hour - 12}pm`;
  };

  return (
    <Box bg="#424552" color="white" borderColor="white" p={4} borderRadius="10px">
      <Box display="flex" mb={2}>
        <Box width="70px" bg="#424552" p={2} ml={2}></Box>
        {days.map((day, idx) => (
          <Box flex="1" bg="#424552" p={2} key={idx} ml={1} borderRadius="md">
            <Text color="white">{day}</Text>
          </Box>
        ))}
      </Box>
      {hours.map((hour, idx) => (
        <Box display="flex" key={idx} mb={4}>
          <Box width="70px" bg="#424552" p={2} borderRadius="md">
          <Text color="white">{formatHour(hour)}</Text>
          </Box>
          {days.map((day, idx) => (
          <Box flex="1" style={{ borderColor: '#a9b1bb', borderWidth: '1px' }} p={2} key={idx} ml={4} borderRadius="md" minHeight="120px"></Box>
        ))}
        </Box>
      ))}
    </Box>
  );
};

export default Agenda;