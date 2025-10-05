from setuptools import setup, find_packages

setup(
    name='dyms_lexer',
    version='0.2.0',
    description='Pygments lexer for DYMS programming language',
    author='Dev-Dami',
    packages=find_packages(),
    install_requires=[
        'Pygments>=2.0',
    ],
    entry_points={
        'pygments.lexers': [
            'dyms = dyms_lexer:DymsLexer',
        ],
    },
    classifiers=[
        'Development Status :: 4 - Beta',
        'Environment :: Plugins',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3',
        'Topic :: Software Development :: Libraries :: Python Modules',
        'Topic :: Text Processing :: Filters',
    ],
)