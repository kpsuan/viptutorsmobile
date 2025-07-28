import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import "./globals.css";

const { width, height } = Dimensions.get('window');
const PRIMARY = '#FF9900';
const BG_LIGHT = '#fff';
const BG_GRAY = '#F3F4F6';
const TEXT_DARK = '#222';
const TEXT_GRAY = '#666';

export default function LandingPage() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.stagger(200, [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const navigateToSignIn = () => {
    router.push('/signin');
  };

  const navigateToSignUp = () => {
    // router.push('/signup'); // You can implement this later
    console.log('Navigate to Sign Up');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Background Decoration */}
        <View style={styles.backgroundDecoration}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
          <View style={[styles.circle, styles.circle3]} />
        </View>

        {/* Header */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }]
            }
          ]}
        >
 
        </Animated.View>

        {/* Main Content */}
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Hero Image */}
          <View style={styles.heroImageContainer}>
             <Image source={require('../assets/images/logo.png')} style={styles.appName} />
          <Text style={styles.tagline}>Learn with Expert Tutors</Text>
          </View>

          
        </Animated.View>

        {/* Call to Action */}
        <Animated.View 
          style={[
            styles.ctaContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={navigateToSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={navigateToSignUp}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>Already have an account? </Text>
            <TouchableOpacity onPress={navigateToSignIn}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 VIPTUTORS. </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG_LIGHT,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  // Background Decoration
  backgroundDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  circle: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.1,
  },
  circle1: {
    width: 200,
    height: 200,
    backgroundColor: PRIMARY,
    top: -50,
    right: -50,
  },
  circle2: {
    width: 150,
    height: 150,
    backgroundColor: PRIMARY,
    bottom: 100,
    left: -30,
  },
  circle3: {
    width: 100,
    height: 100,
    backgroundColor: PRIMARY,
    top: height * 0.4,
    right: 20,
  },

  // Header
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  logoContainer: {
    marginBottom: 24,
  },
  appName: {
    height: 60,
    width: 300,
    marginBottom: 8,
    resizeMode: 'contain',
    alignSelf: 'center',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tagline: {
    fontSize: 18,
    color: TEXT_GRAY,
    textAlign: 'center',
    lineHeight: 24,
  },

  // Content
  content: {
    flex: 1,
    paddingVertical: 40,
  },
  
  heroImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heroImage: {
    width: width * 0.8,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  // Description
  descriptionContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  descriptionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: TEXT_DARK,
    textAlign: 'center',
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
    color: TEXT_GRAY,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },


  ctaContainer: {
    paddingBottom: 20,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: PRIMARY,
    borderRadius: 16,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: PRIMARY,
  },
  secondaryButtonText: {
    color: PRIMARY,
    fontSize: 18,
    fontWeight: '700',
  },
  loginPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginPromptText: {
    fontSize: 16,
    color: TEXT_GRAY,
  },
  loginLink: {
    fontSize: 16,
    color: PRIMARY,
    fontWeight: '600',
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: TEXT_GRAY,
    textAlign: 'center',
  },
});