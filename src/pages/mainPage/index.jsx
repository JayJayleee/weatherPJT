import React from 'react'
import { useNavigate } from "react-router-dom";
import OutfitListPage from '../outfitListPage'

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div>
        <button onClick={()=>navigate("/outfitlist")}>코디 시작하기</button>
    </div>
  )
}
