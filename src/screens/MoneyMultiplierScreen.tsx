//src/screens/MoneyMultiplierScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable, TextInput, SafeAreaView
} from 'react-native';
import { Feather } from '@expo/vector-icons';

type FeatherProps = React.ComponentProps<typeof Feather>;
const Heart = (props: FeatherProps) => <Feather name="heart" {...props} />;
const MessageCircle = (props: FeatherProps) => <Feather name="message-circle" {...props} />;
const Users = (props: FeatherProps) => <Feather name="users" {...props} />;
const Plus = (props: FeatherProps) => <Feather name="plus" {...props} />;
const Star = (props: FeatherProps) => <Feather name="star" {...props} />;
const Trophy = (props: FeatherProps) => <Feather name="award" {...props} />;
const ArrowLeft = (props: FeatherProps) => <Feather name="arrow-left" {...props} />;
const Bell = (props: FeatherProps) => <Feather name="bell" {...props} />;
const Gift = (props: FeatherProps) => <Feather name="gift" {...props} />;
const Send = (props: FeatherProps) => <Feather name="send" {...props} />;
const TrendingUp = (props: FeatherProps) => <Feather name="trending-up" {...props} />;
const Copy = (props: FeatherProps) => <Feather name="copy" {...props} />;

export default function MoneyMultiplierScreen() {
  const [currentPage, setCurrentPage] = useState<'home'|'support'|'success'|'community'|'invite'|'noti'>('home');
  const [selectedPostId, setSelectedPostId] = useState<number|null>(null);
  const [newComment, setNewComment] = useState('');

  const myInvestment = {
    id: 1, title: '나의 만원 복사 도전!', description: '1만원으로 시작!',
    initialAmount: 10000, currentAmount: 61000, participants: 12,
    level: 3, daysActive: 15, multiplier: 6.1, nextLevelTarget: 100000,
    supportMessages: [
      { id: 1, author: '돈벼락맞고파', message: '와 진짜 6배!', date: '2024.01.10', amount: 10000 },
      { id: 2, author: '부자되고싶어', message: '신기해요!', date: '2024.01.08', amount: 10000 },
      { id: 3, author: '복사기마스터', message: '레벨3 축하!', date: '2024.01.05', amount: 10000 },
    ],
  };

  const communityPosts = [
    {
      id: 1, author: '복사기초보', title: '첫 1만원 복사 성공!',
      content: '3일만에 2만원!', likes: 24,
      comments: [
        { id: 1, author: '돈복사달인', content: '축하해요! 10배 달성했어요', time: '1시간 전' },
        { id: 2, author: '신규유저', content: '팁 좀요~', time: '30분 전' },
      ],
      time: '2시간 전', level: 1, multiplier: 2.0, isMyPost: false,
    },
    {
      id: 2, author: 'sonoo2', title: '레벨3! 6.1배 완료!',
      content: '만원이 6만원이 되었어요!', likes: 45,
      comments: [
        { id: 1, author: '부자꿈나무', content: '비법 좀!', time: '2시간 전' },
        { id: 2, author: '돈복사왕', content: '레벨3 축하!', time: '1시간 전' },
      ],
      time: '5시간 전', level: 3, multiplier: 6.1, isMyPost: true,
    },
  ];

  const notices = [
    { id: 1, title: '신규 이벤트: 첫 복사 보너스!', date: '2024.01.15', content: '첫 성공시 1천원 보너스' },
    { id: 2, title: '레벨 시스템 업데이트', date: '2024.01.10', content: '보상 추가' },
  ];

  const successStories = [
    { id: 1, title: '100배 달성!', author: '복사기마스터', content: '1만원이 100만원!', date: '2024.01.12', likes: 234, level: 10, multiplier: 100.0 },
  ];

  const levelBadge = (lv:number) => (
    <View style={[styles.badge, lv>=10?styles.badgeGold:lv>=5?styles.badgePurple:lv>=3?styles.badgeBlue:styles.badgeGreen]}>
      <Text style={styles.badgeTxt}>{lv>=10?'👑':lv>=5?'🚀':lv>=3?'⭐':'🌱'}</Text>
    </View>
  );

  const Header = ({ title, backTo }: {title:string; backTo?:typeof currentPage}) => (
    <View style={styles.header}>
      {backTo && (
        <Pressable onPress={()=>setCurrentPage(backTo)} style={styles.headerBack}>
          <ArrowLeft color="#fff" size={24} />
        </Pressable>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{width:24}} />
    </View>
  );

  const Home = () => (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      <View style={styles.center}>
        <Text style={styles.emoji}>💰</Text>
        <Text style={styles.h1}>만원으로 돈복사?</Text>
        <Text style={styles.hint}>1만원으로 시작하는 돈 불리기 게임!</Text>
      </View>

      <View style={styles.cardWhite}>
        <View style={styles.row}>
          <View style={{marginRight:12}}>
            {levelBadge(myInvestment.level)}
            <View style={styles.levelPill}><Text style={styles.levelPillTxt}>Lv.{myInvestment.level}</Text></View>
          </View>
          <View>
            <Text style={styles.nick}>sonoo2님</Text>
            <Text style={styles.subtle}>복사기 마스터 도전 중!</Text>
          </View>
        </View>

        <View style={[styles.banner, {backgroundColor:'#1DB954'}]}>
          <Text style={styles.bannerSmall}>현재 복사된 금액</Text>
          <View style={styles.rowCenter}>
            <Text style={styles.won}>₩</Text>
            <Text style={styles.big}>{myInvestment.currentAmount.toLocaleString()}</Text>
          </View>
          <View style={styles.rowCenter}>
            <Copy color="#EAFBEA" size={16} />
            <Text style={styles.bannerMini}>{myInvestment.multiplier}배 달성!</Text>
          </View>
        </View>

        <Text style={styles.label}>다음 레벨까지</Text>
        <View style={styles.progressBg}>
          <View
            style={[
              styles.progress,
              { width: `${Math.min((myInvestment.currentAmount/myInvestment.nextLevelTarget)*100, 100)}%` }
            ]}
          />
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.subtle}>현재: {myInvestment.currentAmount.toLocaleString()}원</Text>
          <Text style={styles.subtle}>목표: {myInvestment.nextLevelTarget.toLocaleString()}원</Text>
        </View>

        <View style={styles.rowGap}>
          <Pressable onPress={()=>setCurrentPage('support')} style={[styles.btn, styles.btnPink]}>
            <Heart color="#fff" size={18} /><Text style={styles.btnTxt}>응원글 ({myInvestment.supportMessages.length})</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.btnBlue]}>
            <Copy color="#fff" size={18} /><Text style={styles.btnTxt}>복사하기</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );

  const Support = () => (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      <Header title="응원 메시지" backTo="home" />
      <View style={styles.cardWhite}>
        <View style={[styles.center, {marginBottom:12}]}>
          <Text style={{fontSize:40}}>🎉</Text>
          <Text style={styles.h2}>{myInvestment.multiplier}배 복사 달성!</Text>
          <View style={[styles.pill,{backgroundColor:'#1DB954'}]}>
            <Text style={{color:'#fff', fontWeight:'bold'}}>₩{myInvestment.currentAmount.toLocaleString()}</Text>
          </View>
        </View>
        {myInvestment.supportMessages.map((m)=>(
          <View key={m.id} style={styles.msg}>
            <View style={styles.rowBetween}>
              <View style={styles.row}>
                <View style={styles.avatar}><Text style={{color:'#fff'}}>💰</Text></View>
                <View>
                  <Text style={styles.nickDark}>{m.author}</Text>
                  <Text style={styles.subtleDark}>{m.date}</Text>
                </View>
              </View>
              <View style={styles.gain}><Text style={{color:'#146C2E', fontWeight:'bold'}}>+₩{m.amount.toLocaleString()}</Text></View>
            </View>
            <Text style={styles.textDark}>{m.message}</Text>
            <Pressable style={styles.inlineBtn}><Heart color="#ef4444" size={16}/><Text style={styles.inlineBtnTxt}>고마워요</Text></Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const Success = () => (
    <ScrollView contentContainerStyle={{ padding:16, paddingBottom:100 }}>
      <Header title="성공 스토리" />
      {successStories.map(st=>(
        <View key={st.id} style={styles.story}>
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              {levelBadge(st.level)}
              <View style={{marginLeft:10}}>
                <Text style={styles.nickDark}>{st.title}</Text>
                <View style={styles.row}>
                  <Text style={styles.subtleDark}>by {st.author}</Text>
                  <View style={[styles.pill,{marginLeft:6}]}><Text style={styles.pillTxt}>Lv.{st.level}</Text></View>
                </View>
              </View>
            </View>
            <View style={styles.date}><Text style={styles.dateTxt}>{st.date}</Text></View>
          </View>
          <Text style={styles.textDark}>{st.content}</Text>
          <View style={styles.rowBetween}>
            <View style={[styles.pill,{backgroundColor:'#F59E0B'}]}><Text style={{color:'#fff', fontWeight:'bold'}}>{st.multiplier}배 달성!</Text></View>
            <Pressable style={styles.inlineBtn}><Heart color="#ef4444" size={16}/><Text style={styles.inlineBtnTxt}>{st.likes}</Text></Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const Community = () => (
    <ScrollView contentContainerStyle={{ padding:16, paddingBottom:160 }}>
      <View style={styles.rowBetween}>
        <View style={styles.row}><Users color="#FBBF24" size={28}/><Text style={styles.h2}>복사기 커뮤니티</Text></View>
        <Pressable style={[styles.fab,{backgroundColor:'#F59E0B'}]}><Plus color="#fff" size={18}/></Pressable>
      </View>

      {communityPosts.map(post=>{
        const opened = selectedPostId===post.id;
        return (
          <View key={post.id} style={styles.post}>
            <View style={styles.row}>
              {levelBadge(post.level)}
              <View style={{marginLeft:10}}>
                <View style={styles.row}>
                  <Text style={styles.nickDark}>{post.author}</Text>
                  <View style={[styles.pill, {marginLeft:6}]}><Text style={styles.pillTxt}>Lv.{post.level}</Text></View>
                  <View style={[styles.pill, {marginLeft:6, backgroundColor:'#DCFCE7'}]}><Text style={{color:'#16A34A', fontWeight:'bold'}}>{post.multiplier}배</Text></View>
                </View>
                <Text style={styles.subtleDark}>{post.time}</Text>
              </View>
            </View>

            <Pressable onPress={()=>setSelectedPostId(opened?null:post.id)}>
              <Text style={styles.postTitle}>{post.title}</Text>
            </Pressable>
            <Text style={styles.textDark}>{post.content}</Text>

            <View style={styles.row}>
              <Pressable style={styles.inlineBtn}><Heart color="#ef4444" size={16}/><Text style={styles.inlineBtnTxt}>{post.likes}</Text></Pressable>
              <Pressable style={[styles.inlineBtn,{marginLeft:14}]} onPress={()=>setSelectedPostId(post.id)}>
                <MessageCircle color="#3B82F6" size={16}/><Text style={[styles.inlineBtnTxt,{color:'#3B82F6'}]}>{post.comments.length}</Text>
              </Pressable>
            </View>

            {opened && (
              <View style={{marginTop:14, paddingTop:14, borderTopWidth:1, borderColor:'#FDE68A'}}>
                <Text style={styles.section}>댓글 ({post.comments.length}개)</Text>
                {post.comments.map(c=>(
                  <View key={c.id} style={styles.comment}>
                    <View style={styles.rowBetween}>
                      <Text style={styles.nickDark}>{c.author}</Text>
                      <Text style={styles.subtleDark}>{c.time}</Text>
                    </View>
                    <Text style={styles.textDark}>{c.content}</Text>
                  </View>
                ))}
                <View style={styles.inputRow}>
                  <TextInput
                    value={newComment}
                    onChangeText={setNewComment}
                    placeholder="응원 댓글을 남겨보세요..."
                    placeholderTextColor="#9CA3AF"
                    style={styles.input}
                  />
                  <Pressable onPress={()=>setNewComment('')} style={[styles.fab,{backgroundColor:'#F59E0B'}]}>
                    <Send color="#fff" size={18}/>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );

  const Invite = () => (
    <ScrollView contentContainerStyle={{ padding:16, paddingBottom:120 }}>
      <Header title="친구 초대" />
      <View style={styles.cardWhite}>
        <View style={styles.center}>
          <Text style={{fontSize:48}}>🎁</Text>
          <Text style={styles.h2}>친구와 함께 돈복사!</Text>
          <Text style={styles.subtleDark}>친구를 초대하고 함께 부자되기</Text>
        </View>
        <Pressable style={[styles.shareBtn,'pink'&&styles.btnPink]}><Text style={styles.shareTxt}>인스타그램으로 공유하기</Text></Pressable>
        <Pressable style={[styles.shareBtn,{backgroundColor:'#FDE047'}]}><Text style={[styles.shareTxt,{color:'#000'}]}>카카오톡으로 공유하기</Text></Pressable>
        <Pressable style={[styles.shareBtn,{backgroundColor:'#60A5FA'}]}><Text style={styles.shareTxt}>텔레그램으로 공유하기</Text></Pressable>
        <Pressable style={[styles.shareBtn,{backgroundColor:'#3B82F6'}]}><Text style={styles.shareTxt}>페이스북으로 공유하기</Text></Pressable>
        <Pressable style={[styles.shareBtn,{backgroundColor:'#22C55E'}]}><Text style={styles.shareTxt}>문자로 공유하기</Text></Pressable>
      </View>
    </ScrollView>
  );

  const Noti = () => (
    <ScrollView contentContainerStyle={{ padding:16, paddingBottom:100 }}>
      <Header title="알림" />
      <Text style={styles.section}>공지사항</Text>
      {notices.map(n=>(
        <View key={n.id} style={styles.notice}>
          <View style={styles.rowBetween}>
            <Text style={styles.nickDark}>{n.title}</Text>
            <View style={styles.date}><Text style={styles.dateTxt}>{n.date}</Text></View>
          </View>
          <Text style={styles.textDark}>{n.content}</Text>
        </View>
      ))}
      <Text style={styles.section}>내 알림</Text>
      <View style={styles.center}>
        <View style={[styles.avatar,{width:64,height:64, backgroundColor:'#F59E0B'}]}>
          <Bell color="#fff" size={28}/>
        </View>
        <Text style={styles.h3}>새로운 알림이 없어요</Text>
        <Text style={styles.hint}>복사 성공시 알림을 받아볼 수 있어요!</Text>
      </View>
    </ScrollView>
  );

  const BottomNav = () => (
    <View style={styles.bottom}>
      {[
        {key:'home', icon:<Star color="#fff" size={22}/>, label:'홈'},
        {key:'success', icon:<Trophy color="#fff" size={22}/>, label:'스토리'},
        {key:'community', icon:<Users color="#fff" size={22}/>, label:'커뮤니티'},
        {key:'invite', icon:<Gift color="#fff" size={22}/>, label:'친구초대'},
        {key:'noti', icon:<Bell color="#fff" size={22}/>, label:'알림'},
      ].map(t=>(
        <Pressable key={t.key}
          onPress={()=>setCurrentPage(t.key as any)}
          style={[styles.navBtn, currentPage===t.key && styles.navBtnActive]}>
          {t.icon}
          <Text style={styles.navTxt}>{t.label}</Text>
        </Pressable>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {currentPage==='home' && <Home/>}
      {currentPage==='support' && <Support/>}
      {currentPage==='success' && <Success/>}
      {currentPage==='community' && <Community/>}
      {currentPage==='invite' && <Invite/>}
      {currentPage==='noti' && <Noti/>}
      <BottomNav/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#F59E0B' },
  header:{ flexDirection:'row', alignItems:'center', marginBottom:12 },
  headerBack:{ padding:6, marginRight:6 },
  headerTitle:{ color:'#fff', fontSize:20, fontWeight:'800' },
  center:{ alignItems:'center', marginBottom:12 },
  emoji:{ fontSize:48, marginBottom:6 },
  h1:{ color:'#fff', fontSize:24, fontWeight:'800' },
  h2:{ color:'#111', fontSize:18, fontWeight:'800', marginTop:6 },
  h3:{ color:'#fff', fontSize:16, fontWeight:'700', marginTop:8 },
  hint:{ color:'#FEF3C7' },
  cardWhite:{ backgroundColor:'#fff', borderRadius:24, padding:16, borderWidth:2, borderColor:'#FCD34D', marginBottom:16 },
  row:{ flexDirection:'row', alignItems:'center' },
  rowCenter:{ flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:4 },
  rowBetween:{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' },
  rowGap:{ flexDirection:'row', justifyContent:'space-between', marginTop:12 },
  badge:{ width:56, height:56, borderRadius:28, alignItems:'center', justifyContent:'center', shadowColor:'#000', shadowOpacity:.2, shadowRadius:6, elevation:3 },
  badgeTxt:{ color:'#fff', fontSize:20 },
  badgeGold:{ backgroundColor:'#F59E0B' },
  badgePurple:{ backgroundColor:'#A855F7' },
  badgeBlue:{ backgroundColor:'#3B82F6' },
  badgeGreen:{ backgroundColor:'#22C55E' },
  levelPill:{ position:'absolute', right:-6, bottom:-6, backgroundColor:'#EC4899', paddingHorizontal:8, paddingVertical:4, borderRadius:12 },
  levelPillTxt:{ color:'#fff', fontSize:10, fontWeight:'bold' },
  nick:{ color:'#1F2937', fontWeight:'800', fontSize:16 },
  subtle:{ color:'#6B7280', marginTop:2 },
  banner:{ borderRadius:16, padding:14, marginVertical:12 },
  bannerSmall:{ color:'#fff' },
  bannerMini:{ color:'#EAFBEA', marginLeft:6, fontWeight:'bold' },
  won:{ color:'#fff', fontSize:20, marginRight:6 },
  big:{ color:'#fff', fontSize:36, fontWeight:'800' },
  label:{ color:'#374151', fontWeight:'700', marginTop:6 },
  progressBg:{ height:10, backgroundColor:'#E5E7EB', borderRadius:6, marginVertical:8 },
  progress:{ height:10, backgroundColor:'#A855F7', borderRadius:6 },
  btn:{ flex:1, height:46, borderRadius:14, alignItems:'center', justifyContent:'center', flexDirection:'row' },
  btnTxt:{ color:'#fff', fontWeight:'800', marginLeft:6 },
  btnPink:{ backgroundColor:'#EC4899' },
  btnBlue:{ backgroundColor:'#3B82F6' },
  nickDark:{ color:'#111827', fontWeight:'800' },
  subtleDark:{ color:'#6B7280', fontSize:12 },
  textDark:{ color:'#374151', marginTop:8 },
  inlineBtn:{ flexDirection:'row', alignItems:'center', paddingVertical:6 },
  inlineBtnTxt:{ marginLeft:6, color:'#ef4444', fontWeight:'700' },
  story:{ backgroundColor:'#F5F3FF', borderWidth:4, borderColor:'#D8B4FE', borderRadius:24, padding:16, marginBottom:12 },
  date:{ backgroundColor:'#F3F4F6', paddingHorizontal:8, paddingVertical:4, borderRadius:12 },
  dateTxt:{ color:'#6B7280', fontSize:12 },
  pill:{ paddingHorizontal:10, paddingVertical:6, borderRadius:999, backgroundColor:'#EDE9FE' },
  pillTxt:{ color:'#7C3AED', fontWeight:'700' },
  post:{ backgroundColor:'#FFFBEB', borderWidth:2, borderColor:'#FDE68A', borderRadius:24, padding:16, marginBottom:12 },
  postTitle:{ color:'#1F2937', fontSize:16, fontWeight:'800', marginTop:8 },
  comment:{ backgroundColor:'#FEFCE8', borderWidth:1, borderColor:'#FDE68A', borderRadius:16, padding:10, marginTop:8 },
  inputRow:{ flexDirection:'row', alignItems:'center', marginTop:10 },
  input:{ flex:1, backgroundColor:'#fff', borderColor:'#FCD34D', borderWidth:2, borderRadius:14, paddingHorizontal:12, paddingVertical:10, color:'#111827', marginRight:10 },
  shareBtn:{ borderRadius:16, paddingVertical:14, paddingHorizontal:12, alignItems:'center', marginTop:10 },
  shareTxt:{ color:'#fff', fontWeight:'800' },
  avatar:{ width:48, height:48, borderRadius:24, backgroundColor:'#F59E0B', alignItems:'center', justifyContent:'center', marginRight:10 },
  gain:{ backgroundColor:'#DCFCE7', paddingHorizontal:8, paddingVertical:4, borderRadius:12 },
  notice:{ backgroundColor:'#FFFBEB', borderWidth:2, borderColor:'#FDE68A', borderRadius:24, padding:16, marginBottom:10 },
  bottom:{ position:'absolute', left:0, right:0, bottom:0, flexDirection:'row', justifyContent:'space-around', paddingHorizontal:10, paddingVertical:8, backgroundColor:'#F59E0B', borderTopWidth:4, borderColor:'#FCD34D' },
  navBtn:{ alignItems:'center', padding:8, borderRadius:12 },
  navBtnActive:{ backgroundColor:'rgba(255,255,255,0.2)' },
  navTxt:{ color:'#fff', fontSize:11, fontWeight:'800', marginTop:2 },
});
