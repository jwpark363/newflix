import { AnimatePresence, motion, useAnimate, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useMatch, useNavigate } from "react-router";
import styled from "styled-components";

const Boxes = styled(motion.nav)`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: white;
`;
const Box = styled.div`
  margin: 0 48px;
  display: flex;
  align-items: center;
`;
const LogoIcon = styled(motion.svg)`
  margin-right: 60px;
  width: 92px;
  height: 24px;
  fill: ${props => props.theme.red};
  path {
    stroke-width: 8px;
    stroke: ${props => props.theme.white.light};
  }
`;
const Menus = styled.ul`
  position: relative;
  display: flex;
  align-items: center;
`;
const Menu = styled.li`
  margin-right: 20px;
  display: flex;
  justify-content:center;
  align-items:ceenter;
  color: ${props => props.theme.white.heavy};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${props => props.theme.white.light};
  }
`;
const SelectedMenu = styled(motion.span)`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 6px;
  background-color: ${props => props.theme.red};
  opacity: 0.6;
`;
const HomeSelected = styled(SelectedMenu)`
  bottom: -12px;
  left: 20px;
`;
const TvSelected = styled(SelectedMenu)`
  bottom: -12px;
  left: 90px;
`;
const FormBox = styled.form`
  margin: 0 48px;
  display: flex;
  align-items: center;
`;
const SearchIcon = styled(motion.svg)`
  z-index: 1;
  width: 24px;
  height: 24px;
  fill: ${props => props.theme.white.light};
`;
const SearchInput = styled(motion.input)`
  position:absolute;
  right: 0px;
  width: 140px;
  padding: 8px 4px 8px 28px;
  background-color: ${props => props.theme.black.light};
  color: ${props => props.theme.white.dark};
  font-size: 14px;
  border:1px solid ${props => props.theme.white.light};
  border-radius: 4px;
  transform-origin: right center;
`;
const LogoVariant = {
  initial: {
    fillOpacity: 1,
  },
  hover: {
    fillOpacity: [0, 0.5, 1, 0.5, 0],
    transition: {
      repeat: Infinity,
      duration: 1,
  
    }
  },
  
}
const IconVariant = {
  initial:{
    x: 0,
  },
  animate:($isshow:boolean) =>({
    x: $isshow? -145 : 0,
    transition:{
      type: "tween" as const,
      duration: 0.2,
    }
  })
}
const InputVariant = {
  initial:{
    opacity: 0,
    scaleX: 0,
  },
  animate:($isshow:boolean) => ({
    opacity: $isshow? 1 : 0 ,
    scaleX: $isshow? 1 : 0,
    transition:{
      type: "tween" as const,
      duration: 0.2,
    }
  }),
}
interface IForm{
  keyword:string
}
function Header() {
  const navigate = useNavigate();
  const chkBase = useMatch("/newflix");
  const isHome = useMatch("/");
  const isSearch = useMatch("/tv");
  const [toggleSearch, setSearch] = useState(false);
  const {scrollY} = useScroll();
  const [scope, animate] = useAnimate();
  const {register,handleSubmit,setValue} = useForm<IForm>();
  const onValid = (data:IForm) => {
    navigate(`/search?keyword=${data.keyword}`);
    setValue("keyword","");
    return;
  }
  useMotionValueEvent(scrollY, "change", (current) => {
    if(current > 30){
      animate(scope.current, {
        backgroundColor:"rgb(0,0,0)",
      });
    }else{
      animate(scope.current, {
        backgroundColor:"none",
      });
    }
  });
  useEffect(() => {
    if(chkBase) navigate("/")
  },[])
  return (
    <Boxes ref={scope}>
      <Box>
        <LogoIcon
          variants={LogoVariant}
          initial="initial"
          whileHover="hover"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 276.742"
        >
          <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </LogoIcon>
        <Menus>
          <Menu key="home"><Link to="/">Home</Link> 
          </Menu>
          <Menu key="tv"><Link to="/tv">Tv Shows</Link> 
          </Menu>
          <AnimatePresence initial={false}>
            {isHome ? <HomeSelected key="home" layoutId="selected"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/> : null}
            {isSearch ? <TvSelected key="tv" layoutId="selected"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/> : null}
          </AnimatePresence>
        </Menus>
      </Box>
      <FormBox style={{position:"relative"}} onSubmit={handleSubmit(onValid)}>
        <SearchIcon variants={IconVariant}
          initial="initial" animate="animate" custom={toggleSearch}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setSearch(prev => !prev)}>
          <path
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </SearchIcon>
        <SearchInput  {...register("keyword", {required:true, minLength:2})} variants={InputVariant} custom={toggleSearch}
          initial="initial" animate="animate" transition={{duration:0.5}}
        placeholder="write seach key word"/>
      </FormBox>
    </Boxes>
  );
}
export default Header;