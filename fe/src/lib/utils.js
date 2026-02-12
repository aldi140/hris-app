import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { weekDays } from "../constants/days";
import dayjs from "dayjs";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const differenceMinutes = (time1, time2) => {
  // console.log(time1, time2);
  const [hours1, minutes1] = time1.split(":");
  const [hours2, minutes2] = time2.split(":");
  const totalMinutes1 = parseInt(hours1) * 60 + parseInt(minutes1);
  const totalMinutes2 = parseInt(hours2) * 60 + parseInt(minutes2);
  // console.log(totalMinutes1, totalMinutes2);
  const minutes = totalMinutes2 - totalMinutes1;
  return minutes;
};

export const formatTime = (time) => {
  if (!time) return "-";
  // console.log("time:", time);
  const times = time.slice(0, 5);
  // console.log(times);
  const [hours, minutes] = times.split(":");
  return `${hours}:${minutes}`;
};

export const formatTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(":");
  return parseInt(hours) * 60 + parseInt(minutes);
};

export const locationMapUrl = (long, lat) => {
  if (!lat || !long) return "-";
  return `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
};

export const getDateOfWeek = (baseDate) => {
  const current = new Date(baseDate);
  const currentNow = new Date();
  const currDate =
    currentNow.getFullYear() +
    "-" +
    String(currentNow.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(currentNow.getDate()).padStart(2, "0");

  const day = current.getDay(); // 0 = Minggu
  // console.log('day', day)
  const diff = day === 0 ? 6 : day - 1;

  current.setDate(current.getDate() - diff);

  const dateWeeks = [];
  const dayWeeks = [];

  for (let i = 0; i < 7; i++) {
    dateWeeks.push(
      current.getFullYear() +
        "-" +
        String(current.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(current.getDate()).padStart(2, "0"),
    );
    dayWeeks.push(current.getDay());
    current.setDate(current.getDate() + 1);
  }

  return { dateWeeks, dayWeeks, currDate };
};

export const getDayOfWeek = (day) => {
  return weekDays[day];
};

export function getMonthDate(date) {
  const start = date.startOf("month").startOf("week");
  const end = date.endOf("month").endOf("week");

  const totalDays = end.diff(start, "day") + 1;

  let currentDate = start;
  const calendar = [];

  for (let i = 0; i < totalDays; i += 7) {
    const week = [];

    for (let d = 0; d < 7; d++) {
      week.push(currentDate);
      currentDate = currentDate.add(1, "day");
    }

    calendar.push(week);
  }

  return calendar;
}

export const hitungJarak = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3;
  const toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const hitungRuteDanWaktuMap = async (lat1, lon1, lat2, lon2) => {
  const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.code === "Ok" && data.routes.length > 0) {
    const route = data.routes[0];
    return {
      jarakMeter: route.distance,
      jarakKm: (route.distance / 1000).toFixed(1),
      waktuDetik: route.duration,
      waktuMenit: Math.round(route.duration / 60),
    };
  }

  return null;
};

export const formatNominal = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};
