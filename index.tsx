import React, { useState, useEffect } from 'react';
import { ShoppingCart, Flame, ChefHat, MapPin, Phone, Clock, Facebook, MessageCircle, X, Plus, Minus, Zap, Search } from 'lucide-react';

// Menu data extracted directly from the provided images S__9707533.jpg to S__9707538.jpg
const menuData = [
  {
    id: 1,
    image: 'S__9707533.jpg', // กะเพราพิซซ่าแตก
    name: 'กะเพราพิซซ่าแตก',
    subtitle: 'พิซซ่าหน้ากะเพราหมูสับ ชีสเยิ้มๆ',
    price: 99,
    ingredients: ['หมูสับ', 'ใบกะเพรา', 'ชีส', 'ซอสพิซซ่า', 'แป้งพิซซ่า'],
    nutrition: { kcal: 560, protein: 28, carbs: 62, fat: 22 },
    spicyLevel: 2,
    tagline: 'พิซซ่า + กะเพรา = ระเบิดความอร่อย!'
  },
  {
    id: 2,
    image: 'S__9707534.jpg', // มาม่าคาโบนาร่ากะเพรา
    name: 'มาม่าคาโบนาร่ากะเพรา',
    subtitle: 'มาม่าครีมซอส + หมูกรอบ + กะเพรา',
    price: 89,
    ingredients: ['เส้นมาม่า', 'หมูกรอบ', 'ไข่', 'ชีส', 'ใบกะเพรา'],
    nutrition: { kcal: 560, protein: 24, carbs: 58, fat: 26 },
    spicyLevel: 2,
    tagline: 'มาม่าไม่ใช่แค่ต้ม... แค่คือศิลปะ!'
  },
  {
    id: 3,
    image: 'S__9707535.jpg', // ไข่ข้นต้มยำชีสระเบิด
    name: 'ไข่ข้นต้มยำชีสระเบิด',
    subtitle: 'ไข่ข้น + ซอสต้มยำ + ชีสเบิร์น',
    price: 89,
    ingredients: ['ไข่', 'หมูกรอบ', 'น้ำต้มยำ', 'ชีส', 'ข้าว'],
    nutrition: { kcal: 610, protein: 26, carbs: 65, fat: 28 },
    spicyLevel: 3,
    tagline: 'ไข่ข้น... ไม่ธรรมดา!'
  },
  {
    id: 4,
    image: 'S__9707536.jpg', // ข้าวไก่กรอบซอสชาไทย
    name: 'ข้าวไก่กรอบซอสชาไทย',
    subtitle: 'ไก่กรอบ ราดซอสชาไทย หวานเค็ม กลมกล่อม',
    price: 89,
    ingredients: ['ไก่กรอบ', 'ซอสชาไทย', 'พริกสด', 'ข้าว', 'หอมใหญ่'],
    nutrition: { kcal: 660, protein: 32, carbs: 70, fat: 24 },
    spicyLevel: 2,
    tagline: 'ชาไทยก็เข้ากับไก่ได้!'
  },
  {
    id: 5,
    image: 'S__9707537.jpg', // สปาเกตตี้กะเพราคาราเมล
    name: 'สปาเกตตี้กะเพราคาราเมล',
    subtitle: 'สปาเกตตี้ + หมูกรอบ + กะเพรา + ซอสคาราเมล',
    price: 109,
    ingredients: ['เส้นสปาเกตตี้', 'หมูกรอบ', 'ใบกะเพรา', 'ซอสคาราเมล', 'พริก'],
    nutrition: { kcal: 620, protein: 26, carbs: 70, fat: 24 },
    spicyLevel: 2,
    tagline: 'หวาน มัน เผ็ด ครบในจานเดียว!'
  },
  {
    id: 6,
    image: 'S__9707538.jpg', // กะเพราไอศกรีมกะทิ
    name: 'กะเพราไอศกรีมกะทิ',
    subtitle: 'กะเพราหมูกรอบ + ไอศกรีมกะทิ',
    price: 129,
    ingredients: ['หมูกรอบ', 'ใบกะเพรา', 'ไอศกรีมกะทิ', 'พริก'],
    nutrition: { kcal: 580, protein: 22, carbs: 55, fat: 30 },
    spicyLevel: 2,
    tagline: 'เย็นนี้... ก็แซ่บได้!'
  }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // home, menu, ai, about, contact

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      });
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-[#FFD629] border-b-4 border-[#191919] shadow-[0_4px_0_0_rgba(25,25,25,1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
            <Flame className="h-10 w-10 text-[#E6392F] mr-2 fill-current" />
            <div className="flex flex-col">
              <span className="font-black text-2xl text-[#191919] leading-none tracking-tight">กระทะแตก!</span>
              <span className="font-bold text-sm text-[#E6392F] leading-none tracking-wider">ครัวแหกสูตร</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setActiveTab('home')} className={`font-bold text-lg hover:text-[#E6392F] transition-colors ${activeTab === 'home' ? 'text-[#E6392F] border-b-4 border-[#E6392F] pt-1' : 'text-[#191919] border-b-4 border-transparent pt-1'}`}>หน้าแรก</button>
            <button onClick={() => setActiveTab('menu')} className={`font-bold text-lg hover:text-[#E6392F] transition-colors ${activeTab === 'menu' ? 'text-[#E6392F] border-b-4 border-[#E6392F] pt-1' : 'text-[#191919] border-b-4 border-transparent pt-1'}`}>เมนูแหกสูตร</button>
            <button onClick={() => setActiveTab('ai')} className={`font-bold text-lg hover:text-[#E6392F] transition-colors flex items-center ${activeTab === 'ai' ? 'text-[#E6392F] border-b-4 border-[#E6392F] pt-1' : 'text-[#191919] border-b-4 border-transparent pt-1'}`}><Zap className="w-5 h-5 mr-1"/> AI แหกสูตร</button>
            <button onClick={() => setActiveTab('about')} className={`font-bold text-lg hover:text-[#E6392F] transition-colors ${activeTab === 'about' ? 'text-[#E6392F] border-b-4 border-[#E6392F] pt-1' : 'text-[#191919] border-b-4 border-transparent pt-1'}`}>เรื่องของเรา</button>
            <button onClick={() => setActiveTab('contact')} className={`font-bold text-lg hover:text-[#E6392F] transition-colors ${activeTab === 'contact' ? 'text-[#E6392F] border-b-4 border-[#E6392F] pt-1' : 'text-[#191919] border-b-4 border-transparent pt-1'}`}>ติดต่อเรา</button>
          </div>

          <div className="flex items-center gap-4">
             {/* Mobile Menu Toggle (Simplified) */}
             <div className="md:hidden flex gap-2">
                <button onClick={() => setActiveTab('menu')} className="font-bold text-[#191919]">เมนู</button>
             </div>
            <button 
              className="relative p-2 bg-[#E6392F] border-2 border-[#191919] rounded-full hover:bg-[#ff554c] transition-transform hover:-translate-y-1 shadow-[2px_2px_0_0_rgba(25,25,25,1)]"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-6 w-6 text-white" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#191919] text-[#FFD629] text-xs font-bold px-2 py-1 rounded-full border-2 border-[#FFD629]">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const Hero = () => (
    <div className="relative bg-[#FFD629] overflow-hidden border-b-8 border-[#191919]">
      {/* Comic dots background pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#191919 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-block transform -rotate-3 bg-[#191919] text-[#FFD629] px-4 py-1 rounded-lg font-bold tracking-widest uppercase mb-4 border-2 border-dashed border-[#FFD629]">
              Crazy Kitchen
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-[#191919] leading-tight" style={{ textShadow: '4px 4px 0px #FFF8E8' }}>
              กระทะแตก!<br/>
              <span className="text-[#E6392F]" style={{ textShadow: '4px 4px 0px #191919' }}>ครัวแหกสูตร</span>
            </h1>
            
            <div className="inline-block">
                <p className="text-2xl font-bold text-[#191919] bg-[#FFF8E8] px-4 py-2 border-4 border-[#191919] shadow-[6px_6px_0_0_rgba(25,25,25,1)] transform rotate-1">
                "แหกทุกสูตร อร่อยทุกจาน"
                </p>
            </div>
            
            <p className="text-lg md:text-xl font-medium text-[#191919] max-w-lg mx-auto lg:mx-0 bg-white/50 p-4 rounded-xl border-2 border-[#191919] border-dashed">
              หิวเมื่อไหร่ก็แวะมา! ครัวนี้พร้อมเสิร์ฟเมนูสุดแหก ที่เปลี่ยนมื้อธรรมดาให้กลายเป็นความอร่อยแบบไม่ธรรมดา
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button 
                onClick={() => setActiveTab('menu')}
                className="bg-[#E6392F] text-white font-bold text-xl py-4 px-8 border-4 border-[#191919] rounded-xl hover:bg-[#ff554c] transition-all hover:-translate-y-1 shadow-[6px_6px_0_0_rgba(25,25,25,1)] flex items-center justify-center group"
              >
                ดูเมนูแหกสูตร <Flame className="ml-2 h-6 w-6 fill-current group-hover:scale-125 transition-transform" />
              </button>
              <button 
                onClick={() => setActiveTab('ai')}
                className="bg-[#FFF8E8] text-[#191919] font-bold text-xl py-4 px-8 border-4 border-[#191919] rounded-xl hover:bg-white transition-all hover:-translate-y-1 shadow-[6px_6px_0_0_rgba(25,25,25,1)] flex items-center justify-center group"
              >
                ให้ AI คิดเมนูให้! <Zap className="ml-2 h-6 w-6 text-[#E6392F] group-hover:animate-pulse" />
              </button>
            </div>
          </div>
          
          <div className="relative mt-10 lg:mt-0">
            {/* Comic burst behind image */}
            <div className="absolute inset-0 bg-[#E6392F] rounded-full scale-110 blur-xl opacity-20 animate-pulse"></div>
            
            <div className="relative border-8 border-[#191919] rounded-3xl overflow-hidden shadow-[16px_16px_0_0_rgba(25,25,25,1)] transform md:rotate-3 transition-transform hover:rotate-0 duration-300 bg-[#FFD629] group">
               <img src="S__9707538.jpg" alt="กะเพราไอศกรีมกะทิ" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
               
               {/* Comic Popups */}
               <div className="absolute -top-6 -right-6 bg-white border-4 border-[#191919] text-[#E6392F] font-black text-3xl p-4 rounded-full shadow-[6px_6px_0_0_rgba(25,25,25,1)] transform rotate-12 flex items-center justify-center animate-bounce" style={{ width: '110px', height: '110px'}}>
                  WOW!
               </div>
               <div className="absolute bottom-6 left-6 bg-[#FFD629] border-4 border-[#191919] text-[#191919] font-black text-xl px-6 py-3 rounded-xl shadow-[6px_6px_0_0_rgba(25,25,25,1)] transform -rotate-6">
                  ครัวนี้ไม่ธรรมดา!
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );

  const MenuCard = ({ item }) => (
    <div className="bg-[#FFF8E8] border-4 border-[#191919] rounded-3xl overflow-hidden flex flex-col shadow-[8px_8px_0_0_rgba(25,25,25,1)] hover:-translate-y-3 hover:shadow-[16px_16px_0_0_rgba(25,25,25,1)] transition-all duration-300 relative group h-full">
      
      {/* Price Tag Sticker */}
      <div className="absolute top-4 right-4 z-10 bg-[#E6392F] text-white border-4 border-[#191919] rounded-full w-24 h-24 flex items-center justify-center shadow-[6px_6px_0_0_rgba(25,25,25,1)] transform rotate-12 group-hover:rotate-0 transition-transform">
        <span className="font-black text-3xl">{item.price}.-</span>
      </div>

      <div className="relative h-64 overflow-hidden border-b-4 border-[#191919] bg-[#FFD629] flex items-center justify-center p-2">
        <img src={item.image} alt={item.name} className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
        
        {/* Comic speech bubble for tagline */}
        <div className="absolute top-4 left-4 bg-white border-4 border-[#191919] px-4 py-2 rounded-2xl rounded-bl-none shadow-[4px_4px_0_0_rgba(25,25,25,1)] text-sm font-black text-[#191919] max-w-[65%] transform -rotate-2">
          {item.tagline}
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmOGU4Ij48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjZmZlNGEwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] bg-repeat">
        <div className="bg-[#FFF8E8] p-2 rounded-xl -mx-2 -mt-2 mb-2">
            <h3 className="text-2xl font-black text-[#191919] mb-1 leading-tight">{item.name}</h3>
            <p className="text-sm font-bold text-[#E6392F] min-h-[40px]">{item.subtitle}</p>
        </div>
        
        <div className="mb-4 bg-white/80 p-3 rounded-xl border-2 border-[#191919] border-dashed">
          <p className="text-xs font-black text-[#191919] uppercase tracking-wider mb-2 flex items-center gap-1">
            <ChefHat className="w-4 h-4"/> ส่วนผสมหลัก
          </p>
          <div className="flex flex-wrap gap-2">
            {item.ingredients.map((ing, idx) => (
              <span key={idx} className="bg-[#FFD629] border-2 border-[#191919] text-[#191919] text-xs font-bold px-2 py-1 rounded-md shadow-[2px_2px_0_0_rgba(25,25,25,1)]">
                {ing}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6 bg-white p-4 rounded-xl border-4 border-[#191919] shadow-[4px_4px_0_0_rgba(25,25,25,1)] text-xs font-bold">
            <div className="col-span-2 flex justify-between border-b-2 border-[#191919]/20 pb-2 mb-2">
              <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-[#FFD629] fill-current stroke-[#191919] stroke-2"/> {item.nutrition.kcal} kcal</span>
              <div className="flex items-center">
                <span className="mr-1">เผ็ด:</span>
                <span className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Flame key={i} className={`w-4 h-4 ${i < item.spicyLevel ? 'text-[#E6392F] fill-current' : 'text-gray-300'}`} />
                  ))}
                </span>
              </div>
            </div>
            <div className="text-center bg-[#FFF8E8] rounded p-1">โปรตีน<br/><span className="text-lg">{item.nutrition.protein}g</span></div>
            <div className="text-center bg-[#FFF8E8] rounded p-1">คาร์บ<br/><span className="text-lg">{item.nutrition.carbs}g</span></div>
            <div className="col-span-2 text-center bg-[#FFF8E8] rounded p-1 mt-1">ไขมัน: {item.nutrition.fat}g</div>
        </div>
        
        <div className="mt-auto pt-2 grid grid-cols-1 gap-3">
          <button 
            onClick={() => addToCart(item)}
            className="w-full bg-[#E6392F] text-white font-black text-lg py-3 px-4 border-4 border-[#191919] rounded-xl hover:bg-[#ff554c] transition-all hover:-translate-y-1 shadow-[4px_4px_0_0_rgba(25,25,25,1)] flex items-center justify-center gap-2 group-hover:shadow-[6px_6px_0_0_rgba(25,25,25,1)]"
          >
            <ShoppingCart className="w-5 h-5"/> สั่งเมนูนี้เลย!
          </button>
        </div>
      </div>
    </div>
  );

  const MenuSection = () => (
    <div className="bg-[#FFF8E8] py-20 relative border-b-8 border-[#191919]">
       {/* Decorative background elements */}
       <div className="absolute top-10 left-10 opacity-20 transform -rotate-12">
          <Flame className="w-32 h-32 text-[#E6392F] fill-current" />
       </div>
       <div className="absolute bottom-20 right-10 opacity-20 transform rotate-12">
          <ChefHat className="w-32 h-32 text-[#191919] fill-current" />
       </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-[#191919] mb-6 inline-block relative">
            <span className="relative z-10 bg-[#FFD629] px-6 py-2 border-4 border-[#191919] shadow-[8px_8px_0_0_rgba(25,25,25,1)] transform -rotate-2 inline-block">
                6 เมนูแหกกฎ
            </span>
            <br/>
            <span className="relative z-10 mt-4 inline-block text-3xl md:text-5xl">อร่อยจนกระทะสะเทือน!</span>
          </h2>
          <p className="text-xl font-bold text-[#E6392F] bg-white inline-block px-4 py-2 border-2 border-[#191919] border-dashed rounded-lg mt-4">
            เลือกเมนูที่ใช่ แล้วไปลุยความอร่อยกัน!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {menuData.map(item => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );

  const AISection = () => {
    const [ingredients, setIngredients] = useState('');
    const [spicyLevel, setSpicyLevel] = useState(2);
    const [result, setResult] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = (e) => {
      e.preventDefault();
      if(!ingredients.trim()) return;

      setIsGenerating(true);
      setResult(null);

      // Simulate AI generation delay
      setTimeout(() => {
        setIsGenerating(false);
        // Demo logic: Just randomly pick one of our existing crazy menus based on input length or a random number
        const randomItem = menuData[Math.floor(Math.random() * menuData.length)];
        setResult({
          title: `เมนูแหกสูตรจาก "${ingredients}" ของคุณ!`,
          suggestion: `ขอแนะนำสไตล์คล้ายๆ "${randomItem.name}"`,
          description: `ด้วยวัตถุดิบที่คุณมี เราขอเสนอให้นำมาผัดกับซอสสูตรพิเศษของเรา สไตล์ครัวแหกสูตร ความเผ็ดระดับ ${spicyLevel}/5 รับรองว่ากระทะสะเทือนแน่นอน!`,
          matchItem: randomItem,
          isDemo: true
        });
      }, 1500);
    };

    return (
      <div className="bg-[#191919] py-20 relative overflow-hidden border-b-8 border-[#E6392F]">
        {/* Lab background effect */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #FFD629 25%, transparent 25%, transparent 75%, #FFD629 75%, #FFD629), repeating-linear-gradient(45deg, #FFD629 25%, transparent 25%, transparent 75%, #FFD629 75%, #FFD629)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="bg-[#FFF8E8] rounded-3xl border-8 border-[#FFD629] p-8 md:p-12 shadow-[16px_16px_0_0_rgba(255,214,41,1)] relative">
            
            {/* Lab decorations */}
            <div className="absolute -top-8 -left-8 bg-white border-4 border-[#191919] p-3 rounded-full shadow-[4px_4px_0_0_rgba(25,25,25,1)] transform -rotate-12">
                <ChefHat className="w-12 h-12 text-[#191919]" />
            </div>
            
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center bg-[#191919] text-[#FFD629] px-6 py-2 rounded-full font-black text-2xl mb-6 border-4 border-[#FFD629] transform -rotate-2 shadow-[4px_4px_0_0_rgba(230,57,47,1)]">
                <Zap className="mr-2 h-8 w-8 fill-current" /> AI แหกสูตร <Zap className="ml-2 h-8 w-8 fill-current" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-[#191919] mb-4">
                มีวัตถุดิบอะไร บอกมา เดี๋ยวเราคิดเมนูให้!
              </h2>
              <p className="text-lg font-bold text-gray-600 bg-white/50 inline-block px-4 py-2 rounded-lg border-2 border-dashed border-gray-400">
                หมดมุกจะทำอะไรกิน? ให้ AI ห้องทดลองครัวของเราช่วยคิดเมนูสุดบ้าคลั่งให้คุณสิ!
              </p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-8 bg-white p-6 md:p-8 rounded-2xl border-4 border-[#191919] shadow-[8px_8px_0_0_rgba(25,25,25,1)]">
              <div>
                <label className="block text-[#191919] font-black text-xl mb-3 flex items-center gap-2">
                    <Search className="w-6 h-6"/> วัตถุดิบที่คุณมี (พิมพ์มาเลย!)
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="เช่น หมูสับ, ไข่, มาม่า, ชีส, ชาไทย..."
                    className="w-full bg-[#FFF8E8] border-4 border-[#191919] text-[#191919] rounded-xl px-4 py-4 text-xl font-bold focus:outline-none focus:bg-white focus:border-[#E6392F] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#191919] font-black text-xl mb-3 flex items-center gap-2">
                    <Flame className="w-6 h-6 text-[#E6392F] fill-current"/> เลือกระดับความเผ็ด
                </label>
                <div className="flex gap-2 sm:gap-4">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSpicyLevel(level)}
                      className={`flex-1 py-3 sm:py-4 border-4 rounded-xl font-bold flex justify-center items-center transition-all ${
                        spicyLevel >= level 
                          ? 'bg-[#E6392F] border-[#191919] text-white shadow-[4px_4px_0_0_rgba(25,25,25,1)] transform scale-105' 
                          : 'bg-[#FFF8E8] border-gray-300 text-gray-400 hover:border-[#191919] hover:text-[#191919]'
                      }`}
                    >
                      <Flame className={`h-6 w-6 sm:h-8 sm:w-8 ${spicyLevel >= level ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                disabled={isGenerating || !ingredients.trim()}
                className={`w-full py-5 rounded-xl font-black text-3xl border-4 border-[#191919] transition-all flex items-center justify-center ${
                  isGenerating || !ingredients.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400'
                    : 'bg-[#FFD629] text-[#191919] hover:bg-[#ffe161] hover:-translate-y-2 shadow-[8px_8px_0_0_rgba(25,25,25,1)]'
                }`}
              >
                {isGenerating ? (
                  <span className="animate-pulse flex items-center">กำลังปรุงสูตรลับ... <Flame className="ml-2 animate-bounce h-8 w-8 text-[#E6392F] fill-current"/></span>
                ) : (
                  <span className="flex items-center gap-2">แหกสูตรเลย! <Zap className="w-8 h-8"/></span>
                )}
              </button>
            </form>

            {/* Result Box */}
            {result && (
              <div className="mt-10 bg-white border-4 border-[#E6392F] rounded-3xl p-6 md:p-8 shadow-[12px_12px_0_0_rgba(230,57,47,1)] transform rotate-1 animate-fadeIn relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#E6392F] text-white font-bold text-xs px-3 py-1 rounded-bl-xl border-l-4 border-b-4 border-[#191919]">
                    *Demo System
                </div>
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="bg-[#FFD629] p-4 border-4 border-[#191919] rounded-full shadow-[4px_4px_0_0_rgba(25,25,25,1)] shrink-0">
                    <ChefHat className="w-12 h-12 text-[#191919]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#E6392F] mb-2">{result.title}</h3>
                    <p className="text-[#191919] font-black text-xl mb-3 bg-[#FFF8E8] inline-block px-3 py-1 border-2 border-[#191919] rounded">{result.suggestion}</p>
                    <p className="text-gray-700 font-bold text-lg mb-4">{result.description}</p>
                    
                    <div 
                        className="mt-6 p-4 border-4 border-[#191919] rounded-2xl bg-[#FFF8E8] flex flex-col sm:flex-row items-center gap-4 cursor-pointer hover:bg-[#FFD629] transition-colors shadow-[4px_4px_0_0_rgba(25,25,25,1)]" 
                        onClick={() => { setActiveTab('menu'); }}
                    >
                      <div className="w-24 h-24 shrink-0 bg-white border-2 border-[#191919] rounded-xl overflow-hidden">
                        <img src={result.matchItem.image} alt="match" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="font-bold text-sm text-[#E6392F] mb-1">เมนูใกล้เคียงในร้าน</p>
                        <p className="font-black text-xl text-[#191919] leading-tight">{result.matchItem.name}</p>
                        <p className="font-bold text-gray-500 text-sm mt-1">คลิกเพื่อดูเมนูทั้งหมด</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  };

  const AboutContactSection = () => (
    <div className="bg-[#FFD629] py-20 border-b-8 border-[#191919]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* About */}
          <div className="bg-white border-8 border-[#191919] p-8 md:p-10 rounded-3xl shadow-[16px_16px_0_0_rgba(25,25,25,1)] transform -rotate-1">
            <div className="flex items-center gap-4 mb-6">
                <ChefHat className="w-10 h-10 text-[#E6392F]"/>
                <h2 className="text-3xl font-black text-[#191919] border-b-4 border-[#E6392F] pb-2 inline-block">
                เรื่องของเรา
                </h2>
            </div>
            
            <h3 className="text-2xl font-black text-[#191919] mb-4">
              เราไม่ใช่ครัวธรรมดา แต่เป็นครัวที่กล้าแหกทุกสูตร!
            </h3>
            <p className="text-lg font-bold text-gray-700 leading-relaxed mb-8">
              <strong className="text-[#E6392F] text-xl">"กระทะแตก ครัวแหกสูตร"</strong> คือร้านอาหารตามสั่งที่อยากเปลี่ยนมื้อธรรมดาให้กลายเป็นมื้อพิเศษ 
              ด้วยไอเดียเมนูที่สร้างสรรค์ รสชาติที่จัดจ้าน และความตั้งใจในการปรุงอาหารทุกจาน 
              เพราะเราเชื่อว่าอาหารที่ดีไม่จำเป็นต้องอยู่ในกรอบเดิม ๆ
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
               <div className="flex-1 bg-[#FFF8E8] p-4 border-4 border-[#191919] rounded-2xl text-center shadow-[6px_6px_0_0_rgba(25,25,25,1)] hover:-translate-y-1 transition-transform">
                 <Flame className="w-12 h-12 mx-auto text-[#E6392F] mb-2 fill-current" />
                 <p className="font-black text-xl text-[#191919]">รสจัดจ้าน</p>
               </div>
               <div className="flex-1 bg-[#FFF8E8] p-4 border-4 border-[#191919] rounded-2xl text-center shadow-[6px_6px_0_0_rgba(25,25,25,1)] hover:-translate-y-1 transition-transform">
                 <Zap className="w-12 h-12 mx-auto text-[#FFD629] fill-current stroke-[#191919] stroke-2 mb-2" />
                 <p className="font-black text-xl text-[#191919]">แปลกใหม่</p>
               </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-[#191919] border-8 border-[#191919] p-8 md:p-10 rounded-3xl shadow-[16px_16px_0_0_rgba(230,57,47,1)] text-white transform rotate-1 relative overflow-hidden">
            {/* BG pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMTkxOTE5Ij48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] bg-repeat"></div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <MapPin className="w-10 h-10 text-[#FFD629]"/>
                    <h2 className="text-3xl font-black text-[#FFD629] border-b-4 border-[#FFD629] pb-2 inline-block">
                    ตามมาตำกันได้ที่นี่!
                    </h2>
                </div>
                
                <div className="space-y-6">
                <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border-2 border-white/10 hover:bg-white/10 transition-colors">
                    <MapPin className="w-8 h-8 text-[#FFD629] shrink-0 mt-1" />
                    <div>
                    <p className="font-black text-xl text-white mb-1">พิกัดความอร่อย</p>
                    <p className="text-gray-300 font-medium text-lg">123 ถนนคนหิว ซอยกระทะไหม้ แขวงอร่อย เขตแซ่บ กรุงเทพฯ 10000</p>
                    </div>
                </div>
                
                <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border-2 border-white/10 hover:bg-white/10 transition-colors">
                    <Clock className="w-8 h-8 text-[#FFD629] shrink-0 mt-1" />
                    <div>
                    <p className="font-black text-xl text-white mb-1">เวลาเปิด-ปิด</p>
                    <p className="text-gray-300 font-medium text-lg">ทุกวัน 10:00 น. - 22:00 น.<br/><span className="text-[#E6392F] font-bold">(หยุดเมื่อกระทะพัง)</span></p>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border-2 border-white/10 hover:bg-white/10 transition-colors">
                    <Phone className="w-8 h-8 text-[#FFD629] shrink-0" />
                    <div>
                    <p className="font-black text-xl text-white mb-1">สายด่วนแก้หิว</p>
                    <p className="text-[#FFD629] font-black text-2xl tracking-wider">02-XXX-XXXX</p>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button className="flex-1 bg-[#1877F2] text-white py-4 rounded-xl font-black text-lg border-2 border-transparent hover:border-white flex justify-center items-center gap-2 hover:bg-[#0c63d4] transition-all">
                    <Facebook className="w-6 h-6 fill-current"/> Facebook
                    </button>
                    <button className="flex-1 bg-[#00B900] text-white py-4 rounded-xl font-black text-lg border-2 border-transparent hover:border-white flex justify-center items-center gap-2 hover:bg-[#009900] transition-all">
                    <MessageCircle className="w-6 h-6 fill-current"/> LINE OA
                    </button>
                </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  const CartSidebar = () => (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-[#191919]/80 z-[60] transition-opacity backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#FFF8E8] z-[70] transform transition-transform duration-300 ease-in-out border-l-8 border-[#191919] shadow-[-20px_0_30px_rgba(0,0,0,0.5)] flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Cart Header */}
        <div className="bg-[#FFD629] p-6 border-b-8 border-[#191919] flex justify-between items-center relative overflow-hidden">
           <div className="absolute top-0 right-10 opacity-20 transform rotate-12">
             <ShoppingCart className="w-32 h-32" />
           </div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-[#E6392F] p-3 rounded-full border-4 border-[#191919] shadow-[4px_4px_0_0_rgba(25,25,25,1)] transform -rotate-12">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black text-[#191919] tracking-tight">ตะกร้าแหกสูตร</h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 bg-white border-4 border-[#191919] hover:bg-[#E6392F] hover:text-white rounded-full transition-colors shadow-[4px_4px_0_0_rgba(25,25,25,1)] relative z-10 group"
          >
            <X className="w-6 h-6 text-[#191919] group-hover:text-white font-bold" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-[#191919] space-y-6">
              <div className="bg-white p-8 rounded-full border-8 border-dashed border-gray-300">
                <ShoppingCart className="w-24 h-24 text-gray-300" />
              </div>
              <p className="text-2xl font-black text-gray-500">ยังไม่มีเมนูในตะกร้า</p>
              <button 
                onClick={() => { setIsCartOpen(false); setActiveTab('menu'); }}
                className="mt-4 bg-[#FFD629] text-[#191919] font-black text-xl py-4 px-8 border-4 border-[#191919] rounded-xl shadow-[6px_6px_0_0_rgba(25,25,25,1)] hover:bg-[#ffe161] hover:-translate-y-1 transition-transform"
              >
                ไปเลือกเมนูกันเลย!
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white border-4 border-[#191919] rounded-2xl p-4 flex gap-4 shadow-[6px_6px_0_0_rgba(25,25,25,1)] relative group">
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="absolute -top-3 -right-3 bg-white border-4 border-[#191919] text-[#E6392F] rounded-full p-2 hover:bg-[#E6392F] hover:text-white transition-colors z-10 shadow-[2px_2px_0_0_rgba(25,25,25,1)] opacity-100 sm:opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-5 h-5 font-bold" />
                  </button>
                  
                  <div className="w-24 h-24 bg-[#FFD629] rounded-xl border-4 border-[#191919] flex items-center justify-center overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-black text-[#191919] text-lg leading-tight line-clamp-2">{item.name}</h4>
                      <p className="font-black text-[#E6392F] text-lg mt-1">{item.price}.-</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-[#FFF8E8] rounded-xl p-1 border-4 border-[#191919]">
                        <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border-2 border-[#191919] font-black text-[#191919] hover:bg-gray-200 shadow-[2px_2px_0_0_rgba(25,25,25,1)] active:shadow-none active:translate-y-[2px] transition-all"
                        >
                            <Minus className="w-5 h-5" />
                        </button>
                        <span className="font-black text-[#191919] text-xl w-6 text-center">{item.quantity}</span>
                        <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border-2 border-[#191919] font-black text-[#191919] hover:bg-gray-200 shadow-[2px_2px_0_0_rgba(25,25,25,1)] active:shadow-none active:translate-y-[2px] transition-all"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                        </div>
                        <div className="font-black text-[#191919] text-xl">
                            {item.price * item.quantity}.-
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="bg-white border-t-8 border-[#191919] p-6 space-y-4 shadow-[0_-10px_20px_rgba(0,0,0,0.1)] z-10 relative">
             <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#FFD629] border-4 border-[#191919] px-4 py-1 rounded-full font-black text-sm shadow-[4px_4px_0_0_rgba(25,25,25,1)]">
                 สรุปยอด
             </div>
            <div className="flex justify-between items-end border-b-4 border-dashed border-gray-300 pb-4 pt-2">
              <span className="font-black text-[#191919] text-xl">ยอดรวมทั้งหมด</span>
              <span className="font-black text-4xl text-[#E6392F] leading-none">{cartTotal}.-</span>
            </div>
            
            <button className="w-full bg-[#E6392F] text-white font-black text-2xl py-4 rounded-2xl border-4 border-[#191919] hover:bg-[#ff554c] transition-transform hover:-translate-y-1 shadow-[6px_6px_0_0_rgba(25,25,25,1)] flex items-center justify-center gap-2 group">
               สั่งเลย! (Demo) <Flame className="w-8 h-8 fill-current group-hover:scale-125 transition-transform"/>
            </button>
            <p className="text-center text-sm font-bold text-gray-500 bg-gray-100 py-2 rounded-lg border-2 border-gray-300 border-dashed">*นี่คือระบบทดลอง ไม่มีการสั่งซื้อจริง</p>
          </div>
        )}

      </div>
    </>
  );

  const Footer = () => (
    <footer className="bg-[#191919] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center mb-6">
          <Flame className="h-12 w-12 text-[#E6392F] mr-3 fill-current" />
          <div className="flex flex-col text-left">
            <span className="font-black text-3xl text-[#FFD629] tracking-tight leading-none">กระทะแตก!</span>
            <span className="font-bold text-lg text-white">ครัวแหกสูตร</span>
          </div>
        </div>
        <p className="text-gray-400 font-bold text-lg mb-2">
          "แหกทุกสูตร อร่อยทุกจาน"
        </p>
        <div className="w-24 h-1 bg-[#E6392F] mx-auto my-6 rounded-full"></div>
        <p className="text-gray-500 font-medium text-sm">
          © {new Date().getFullYear()} กระทะแตก ครัวแหกสูตร. All rights reserved.<br/>
          (โปรเจกต์สาธิตการออกแบบเว็บไซต์)
        </p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen font-sans bg-[#FFF8E8] selection:bg-[#FFD629] selection:text-[#191919]">
      <Navbar />
      
      <main>
        {/* Render sections based on active tab, but keep Hero always visible if home */}
        {(activeTab === 'home' || activeTab === 'menu' || activeTab === 'ai') && <Hero />}
        {(activeTab === 'home' || activeTab === 'menu') && <MenuSection />}
        {(activeTab === 'home' || activeTab === 'ai') && <AISection />}
        {(activeTab === 'home' || activeTab === 'about' || activeTab === 'contact') && <AboutContactSection />}
      </main>

      <Footer />
      <CartSidebar />

      {/* Global CSS for font and animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
        
        body {
          font-family: 'Kanit', sans-serif;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px) rotate(2deg); }
          to { opacity: 1; transform: translateY(0) rotate(1deg); }
        }
      `}} />
    </div>
  );
}