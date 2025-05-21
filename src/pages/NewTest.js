// src/pages/LinksList.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://mwcdepjwazbsggzotkac.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Y2RlcGp3YXpic2dnem90a2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NzIyMTcsImV4cCI6MjA2MzM0ODIxN30.ftDUzWaSPn9l3bcpr6y8gPI9PLIaYXozYMMu6XwZDwE'
)

function LinksList() {
  const { classId, subjectId, infoId } = useParams();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLinks() {
      setLoading(true);
      const { data, error } = await supabase
        .from("links")
        .select("*")
        .eq("class", parseInt(classId))
        .eq("subject", parseInt(subjectId))
        .eq("type", parseInt(infoId));

      if (error) {
        console.error("Error fetching links:", error.message);
      } else {
        console.log("Links from Supabase:", data);
        setLinks(data);
      }

      setLoading(false);
    }

    fetchLinks();
  }, [classId, subjectId, infoId]);

  return (
    <div className="p-8 max-w-3xl mx-auto" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">קישורים</h1>
      {loading ? (
        <p className="text-gray-500">טוען קישורים...</p>
      ) : links.length === 0 ? (
        <p className="text-gray-500">לא נמצאו קישורים מתאימים.</p>
      ) : (
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.link_num} className="p-4 border rounded-lg shadow-sm bg-white">
              <a
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-lg"
              >
                {link.name || link.link}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LinksList;
