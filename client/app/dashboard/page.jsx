"use client";
import Sidebar from '../components/Sidebar';
import PerformanceChart from '../components/PerformanceChart';
import PerformanceMetrics from '../components/OverallScore';
import RecentSessions from './Recents';
import ProfileCard from '../components/ProfileCard';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import '../components/bg.css';

export default function Dashboard() {
    const { userId } = useParams();
    const [localUserId, setLocalUserId] = useState('');

    // Fetch userId from local storage when the component mounts
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setLocalUserId(storedUserId);
        }
    }, []);

    return (
        <div>
                <Sidebar />
                <div className="flex w-full static-bg min-h-screen max-h-full">
                    <div className="w-full h-full">
                        <div className="flex flex-col mt-4 ml-16 md:ml-28 mx-1 mb-6 gap-6">
                            <div className="w-full">
                                <ProfileCard />
                            </div>
                            {/* Chart and metrics underneath profile */}
                            <div className="w-full mt-4">
                                {/* Chart full width */}
                                <div className="pro-card p-6">
                                    <PerformanceChart />
                                </div>

                                {/* Indicators row underneath chart (centered) */}
                                <div className="mt-6 flex justify-center">
                                    <div className="flex gap-6 items-center flex-wrap max-w-4xl justify-center">
                                        {/* PerformanceMetrics renders the circular indicators. It will wrap on small screens */}
                                        <PerformanceMetrics userId={localUserId} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex ml-16 md:ml-28 mx-1'>
                            <RecentSessions />
                        </div>
                    </div>
                </div>
            </div>
    );
}