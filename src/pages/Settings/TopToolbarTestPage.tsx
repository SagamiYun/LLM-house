import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../shared/store';
import { updateSettings } from '../../shared/store/settingsSlice';
import {
  Box,
  Typography,
  Paper,
  FormGroup,
  FormControlLabel,
  Switch,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import { ArrowLeft, Menu, Settings } from 'lucide-react';
import { ModelSelector } from '../ChatPage/components/ModelSelector';

const TopToolbarTestPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const topToolbar = settings.topToolbar || {
    showSettingsButton: true,
    showModelSelector: true,
    modelSelectorStyle: 'dialog',
    showChatTitle: true,
    showTopicName: false,
    showNewTopicButton: false,
    showClearButton: false,
    showMenuButton: true,
  };

  const handleBack = () => {
    navigate('/settings/appearance');
  };

  const handleModelMenuClick = () => {
    setMenuOpen(true);
  };

  const handleModelMenuClose = () => {
    setMenuOpen(false);
  };

  const handleModelSelect = (model: any) => {
    console.log('Selected model:', model);
    setMenuOpen(false);
  };

  const toggleModelSelectorStyle = () => {
    const newStyle = topToolbar.modelSelectorStyle === 'dialog' ? 'dropdown' : 'dialog';
    dispatch(updateSettings({
      topToolbar: {
        ...topToolbar,
        modelSelectorStyle: newStyle
      }
    }));
  };

  // 模拟可用模型数据
  const availableModels = [
    { id: 'gpt-4', name: 'GPT-4', provider: 'openai', description: 'OpenAI GPT-4 模型' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'openai', description: 'OpenAI GPT-3.5 Turbo 模型' },
    { id: 'claude-3', name: 'Claude 3', provider: 'anthropic', description: 'Anthropic Claude 3 模型' },
  ];

  const selectedModel = availableModels[0];

  return (
    <Box sx={{
      height: '100vh',
      backgroundColor: 'background.default',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* 头部 */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        borderBottom: 1,
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        zIndex: 10,
        flexShrink: 0
      }}>
        <ArrowLeft
          style={{ marginRight: '16px', cursor: 'pointer' }}
          onClick={handleBack}
        />
        <Typography variant="h6" color="primary" sx={{ flexGrow: 1 }}>
          模型选择器测试页面
        </Typography>
      </Box>

      <Box sx={{ p: 2, flex: 1, overflow: 'auto' }}>
        {/* 控制面板 */}
        <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid #eee' }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            模型选择器样式控制
          </Typography>
          
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={topToolbar.modelSelectorStyle === 'dialog'}
                  onChange={toggleModelSelectorStyle}
                />
              }
              label={`当前样式: ${topToolbar.modelSelectorStyle === 'dialog' ? '弹窗模式' : '下拉模式'}`}
            />
          </FormGroup>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            切换开关来测试不同的模型选择器样式。弹窗模式使用对话框，下拉模式使用下拉菜单。
          </Typography>
        </Paper>

        {/* 测试区域 */}
        <Paper elevation={2} sx={{ mb: 3, overflow: 'hidden' }}>
          <Typography variant="subtitle2" sx={{ p: 2, pb: 1, fontWeight: 600 }}>
            模型选择器测试
          </Typography>
          
          <AppBar
            position="static"
            elevation={0}
            sx={{
              bgcolor: 'background.paper',
              color: 'text.primary',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-between', minHeight: '56px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton edge="start" color="inherit" size="small">
                  <Menu />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  对话
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* 这里是关键测试组件 */}
                <ModelSelector
                  selectedModel={selectedModel}
                  availableModels={availableModels}
                  handleModelSelect={handleModelSelect}
                  handleMenuClick={handleModelMenuClick}
                  handleMenuClose={handleModelMenuClose}
                  menuOpen={menuOpen}
                />
                
                <IconButton color="inherit" onClick={() => navigate('/settings')}>
                  <Settings />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          
          <Typography variant="caption" sx={{ p: 2, pt: 1, color: 'text.secondary', display: 'block' }}>
            点击模型选择器测试弹出功能。在弹窗模式下，点击按钮应该能正确打开模型选择对话框。
          </Typography>
        </Paper>

        {/* 说明 */}
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee', bgcolor: 'info.light' }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            🔧 测试说明
          </Typography>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              切换上方的开关来改变模型选择器样式
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              在弹窗模式下，应该显示带文字的按钮
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              在下拉模式下，应该显示下拉选择器
            </Typography>
            <Typography component="li" variant="body2">
              无论哪种模式，点击都应该能正确打开模型选择界面
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default TopToolbarTestPage;
