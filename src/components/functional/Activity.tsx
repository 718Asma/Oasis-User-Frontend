import type { Activity } from "@/lib/types";
import React from "react";

const ActivityLog: React.FC<Activity> = ({ action, timestamp }) => {
    return (
        <div className="mb-4 last:mb-0">
            <p className="text-sm font-medium">{action}</p>
            <p className="text-xs text-gray-500">
                {new Date(timestamp).toLocaleString()}
            </p>
        </div>
    );
};

export default ActivityLog;
