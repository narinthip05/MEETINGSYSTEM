import React, { useState, useEffect } from 'react';

const MeetingRoom: React.FC = () => {
  const [meetingRooms, setMeetingRooms] = useState<any[]>([]);

  const fetchMeetingRooms = async () => {
    try {
      const response = await fetch('http://localhost/api/meeting_room.php');
      const data = await response.json();
      setMeetingRooms(data);
    } catch (error) {
      console.error('Error fetching meeting rooms:', error);
    }
  };

  useEffect(() => {
    fetchMeetingRooms();
  }, []);

  return (
    <div>
      <h1>Meeting Rooms</h1>
      <ul>
        {meetingRooms.map((room, index) => (
          <li key={index}>
            {room.room_name} ({room.capacity} seats)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeetingRoom;
