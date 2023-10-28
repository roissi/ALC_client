import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import AgendaEntry from "./AgendaEntry";
import {
  Box,
  Text,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { fetchAgendaEntries } from "../services/api";
import { useAuth } from "./Layout";

const Agenda = () => {
  const { isLoggedIn } = useAuth();
  const [isEditable, setIsEditable] = useState(isLoggedIn);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const hours = Array.from({ length: 12 }, (_, i) => i + 8);
  const breakpoint = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const isSingleDayView =
    breakpoint === "base" || breakpoint === "sm" || breakpoint === "md";
  const entryBoxFlex = useBreakpointValue({
    base: "1.5",
    sm: "1",
    md: "1",
    lg: "1",
    xl: "1",
  });
  const entryBoxWidth = useBreakpointValue({
    base: "calc(100% - 10px)",
    sm: "flex",
    md: "flex",
    lg: "flex",
    xl: "flex",
  });

  const [selectedCell, setSelectedCell] = useState(null);
  const [agendaEntries, setAgendaEntries] = useState({});

  const getDateForDay = (dayIndex) => {
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay() - 1;
    const difference = dayIndex - currentDayIndex;
    const targetDate = new Date(
      currentDate.setDate(currentDate.getDate() + difference),
    );
    return `${targetDate.getDate()}`;
  };

  const handlePreviousDay = () => {
    setCurrentDayIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 6));
  };

  const handleNextDay = () => {
    setCurrentDayIndex((prevIndex) => (prevIndex < 6 ? prevIndex + 1 : 0));
  };

  useEffect(() => {
    const initAgenda = async () => {
      const token = localStorage.getItem("jwtToken");

      if (token) {
        try {
          const decoded = jwt_decode(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            localStorage.removeItem("jwtToken");
          } else {
            await refreshAgendaEntries();
          }
        } catch (error) {
          localStorage.removeItem("jwtToken");
          console.error("Invalid or expired token:", error);
        }
      } else {
        setAgendaEntries({});
      }
    };

    setIsEditable(isLoggedIn);

    if (isLoggedIn) {
      refreshAgendaEntries();
    } else {
      initAgenda();
    }
  }, [isLoggedIn]);

  const DigitalClock = ({ hour }) => {
    let displayHour = hour % 12 || 12;
    let period = hour < 12 ? "AM" : "PM";

    if (breakpoint === "base") {
      return (
        <span
          style={{ fontFamily: "Digital-7 Mono, monospace", fontSize: "1.2em" }}
        >
          {displayHour}
          <br />
          {period}
        </span>
      );
    } else {
      return (
        <span
          style={{ fontFamily: "Digital-7 Mono, monospace", fontSize: "1.2em" }}
        >
          {displayHour}:00 {period}
        </span>
      );
    }
  };

  const handleCellClick = (day, hour) => {
    setSelectedCell({ day, hour });
  };

  const refreshAgendaEntries = async () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const data = await fetchAgendaEntries(token);
        const formattedData = data.reduce((acc, entry) => {
          const key = `${entry.day}-${entry.hour}`;
          acc[key] = entry;
          return acc;
        }, {});
        setAgendaEntries(formattedData);
      } catch (error) {
        console.error("Could not refresh agenda entries:", error);
      }
    }
  };

  const handleAgendaEntry = async (day, hour, entry) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const entryKey = `${day}-${hour}`;
      if (agendaEntries.hasOwnProperty(entryKey)) {
        const id = agendaEntries[entryKey].id;
        await addOrUpdateAgendaEntry(day, hour, entry, id, token);
      }
    }
  };

  return (
    <Box
      bg="tertiary"
      color="secondary"
      borderColor="white"
      m={4}
      p={4}
      borderRadius="10px"
    >
      {isSingleDayView && (
        <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
          <IconButton
            icon={<ChevronLeftIcon />}
            onClick={handlePreviousDay}
            aria-label="Previous Day"
          />
          <Text mx={4} fontSize="xl">
            {days[currentDayIndex]} {getDateForDay(currentDayIndex)}
          </Text>
          <IconButton
            icon={<ChevronRightIcon />}
            onClick={handleNextDay}
            aria-label="Next Day"
          />
        </Box>
      )}
      {!isSingleDayView && (
        <Box display="flex" mb={2}>
          <Box width="70px" bg="tertiary" p={2} mr={2}></Box>
          {days.map((day, idx) => (
            <Box
              flex="1"
              bg="quinary"
              p={2}
              key={idx}
              mr={idx !== days.length - 1 ? 2 : 0}
              borderRadius="md"
            >
              <Text color="secondary" fontSize="xl">
                {day} {getDateForDay(idx)}
              </Text>
            </Box>
          ))}
        </Box>
      )}
      {hours.map((hour, idx) => (
        <Box display="flex" key={idx} mb={4}>
          <Box
            width={breakpoint === "base" ? "40px" : "70px"}
            bg="quinary"
            p={2}
            mr={2}
            borderRadius="md"
          >
            <Text color="secondary">
              <DigitalClock hour={hour} />
            </Text>
          </Box>
          {days.map(
            (day, idx) =>
              (!isSingleDayView || idx === currentDayIndex) && (
                <Box
                  width={entryBoxWidth}
                  flex={entryBoxFlex}
                  borderColor="secondary"
                  borderWidth="2px"
                  boxShadow="md"
                  p={2}
                  key={idx}
                  mr={!isSingleDayView && idx !== days.length - 1 ? 2 : 0}
                  mb={isSingleDayView ? 0 : 4}
                  borderRadius="md"
                  minHeight="120px"
                  onClick={() => handleCellClick(day, hour)}
                >
                  <AgendaEntry
                    day={day}
                    hour={hour}
                    agendaEntries={agendaEntries}
                    isEditable={isEditable}
                    refreshAgendaEntries={refreshAgendaEntries}
                  />
                </Box>
              ),
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Agenda;
