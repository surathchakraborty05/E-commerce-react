import { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ProfileDropdown() {
  const [imgError, setImgError] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [customerNam, setCustomerName] = useState("");
  const [emaill, setemail] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");
  
      if (!storedUser) {
        console.log("User not found in localStorage");
        navigate("/login");
        return;
      }
  
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
  
      // fetch name and address from database
      const { data, error } = await supabase
        .from("profiless")   
        .select("full_name, email")
        .eq("id", parsedUser.id)
        .single();
  
      if (error) {
        console.log("Error fetching user:", error);
        return;
      }
  
      if (data) {
        setCustomerName(data.full_name);
        setemail(data.email);
      }
    };
  
    fetchUser();
  }, []);
  const goToProfile = () => {
    navigate('/profile');
    setIsOpen(false); 
  };
  const goTowitchlist = () => {
    navigate('/wishlist');
    setIsOpen(false); 
  };
  const gotologin = () => {
    navigate('/SignUp');
    setIsOpen(false); 
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/50 overflow-hidden"
      >
       {!imgError ? (
        <img
          src="https://images.unsplash.com/photo-1526116977494-90748acc0cad?fm=jpg&amp;q=60&amp;w=3000&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWVzdGhldGljJTIwYm95fGVufDB8fDB8fHww"
          alt="User profile"
          className="w-full h-full object-cover"
          onError={() => setImgError(true)} // agar load fail hua toh fallback
        />
      ) : (
        <User className="text-white w-6 h-6" />
      )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-md border border-blue-500/20 rounded-xl shadow-2xl shadow-blue-500/20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-6 py-4 border-b border-blue-500/20">
            <div className="flex items-center gap-3">
              <div className=" flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
               {!imgError ? (
        <img
          src="https://images.unsplash.com/photo-1526116977494-90748acc0cad?fm=jpg&amp;q=60&amp;w=3000&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWVzdGhldGljJTIwYm95fGVufDB8fDB8fHww"
          alt="User profile"
          className="w-full h-full object-cover"
          onError={() => setImgError(true)} // agar load fail hua toh fallback
        />
      ) : (
        <User className="text-white w-6 h-6" />
      )} </div>
              <div>
                <p className="text-white font-semibold" onClick={gotologin}>{customerNam}</p>
                <p className="text-gray-400 text-sm break-all">{emaill}</p>
              </div>
            </div>
          </div>

          <div className="px-2 py-3 space-y-1">
            <button
              onClick={goToProfile} // <- Navigate to profile
              className="w-full px-4 py-2 text-left text-gray-300 hover:bg-blue-500/20 hover:text-white rounded-lg transition-colors flex items-center gap-3 group"
            >
              <User size={18} className="group-hover:text-blue-400" />
              <span>My Profile</span>
            </button>
            <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-blue-500/20 hover:text-white rounded-lg transition-colors flex items-center gap-3 group" onClick={goTowitchlist}>
              <Heart size={18} className="group-hover:text-blue-400" />
              <span>Wishlist</span>
            </button>
            <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-blue-500/20 hover:text-white rounded-lg transition-colors flex items-center gap-3 group">
              <Settings size={18} className="group-hover:text-blue-400" />
              <span>Settings</span>
            </button>
          </div>

          <div className="px-2 py-3 border-t border-blue-500/20">
            <button onClick={gotologin} className="w-full px-4 py-2 text-left text-gray-300 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors flex items-center gap-3 group">
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}